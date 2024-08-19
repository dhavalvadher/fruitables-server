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
            required: true
        }
    }
)

const cartschema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            required: true
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "Subcategories",
            required: true
        },
        items: [itemSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Carts = mongoose.model('Carts', cartschema)

module.exports = Carts