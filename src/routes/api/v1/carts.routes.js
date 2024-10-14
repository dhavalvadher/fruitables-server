const express = require('express');
const { controllerCarts } = require('../../../controller');



const route = express.Router()

route.get(
    '/get-cart/:cart_id',
    controllerCarts.getCart
)

// route.get(
//     '/get-cart',
//     controllerCarts.getCart
// )

route.post(
    '/add-cart',
    controllerCarts.addCarts
)

route.put(
    '/update-cart/:cart_id',
    controllerCarts.updatecart
)
route.put(
    '/update-quantity/:cart_id',
    controllerCarts.updatequantity
)

route.delete(
    '/delete-cart/:cart_id/:product_id',
    controllerCarts.deleteCartItem
);

module.exports = route;