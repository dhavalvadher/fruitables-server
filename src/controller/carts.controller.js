const Carts = require("../model/carts.model")

const getCart = async (req, res) => {
    try {
        const carts = await Carts.findById(req.params.cart_id)

        if (!carts) {
            res.status(404).json({
                success: false,
                meassage: 'carts not found.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'carts fetch successfully.',
            data: carts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const addCarts = async (req, res) => {
    try {
        const { user_id, isActive = true, items } = req.body
        console.log("bodyyyyyyyyy", req.body);

        let cart = await Carts.findOne({ user_id });
        // console.log(cart);

        if (!cart) {
            cart = new Carts({ user_id, isActive, items })
        } else {
            items.forEach(item => {
                const itemIndex = cart.items.findIndex(v => v.product_id.toString() === item.product_id);
                if (itemIndex !== -1) {
                    cart.items[itemIndex].quantity += item.quantity
                } else {
                    cart.items.push({ product_id: item.product_id, quantity: item })
                }
            })
        }
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'cart fetch successfully.',
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            meassage: 'Internal Server Error.' + error.meassage
        })
    }
}

const updatecart = async (req, res) => {
    try {
        const carts = await Carts.findByIdAndUpdate(req.params.cart_id, req.body, { new: true, runValidators: true })
        console.log(carts);

        if (!carts) {
            return res.status(400).json({
                success: false,
                message: 'carts not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'carts update successfully',
            data: carts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const updatequantity = async (req, res) => {
    try {
        const carts = await Carts.findByIdAndUpdate(req.params.cart_id, req.body, { new: true, runValidators: true })
        console.log(carts);

        if (!carts) {
            return res.status(400).json({
                success: false,
                message: 'carts not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'carts update successfully',
            data: carts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const { cart_id, product_id } = req.params;

        const cart = await Carts.findById(cart_id);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

      
        const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart'
            });
        }

      
        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Product removed from cart successfully',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
};
module.exports = {
    getCart,
    addCarts,
    updatecart,
    updatequantity,
    deleteCartItem
}