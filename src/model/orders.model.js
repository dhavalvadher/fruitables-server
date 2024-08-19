const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    {
        item_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }
)

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    seller_id: {
        type: mongoose.Types.ObjectId,
        ref: "Sellers",
        required: true
    },
    shippingAddress: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    items: [itemSchema],
    discount: {
        type: Number,
        default: 0
    }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Orders = mongoose.model("Orders", orderSchema)

module.exports = Orders