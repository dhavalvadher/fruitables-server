const mongoose = require('mongoose')


const productsSchema = new mongoose.Schema(
    {
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            require: true
        },
        category_id:{
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            require: true
        },
        // seller_id:{
        //     type: mongoose.Types.ObjectId,
        //     ref: 'Users',
        //     require: true
        // },
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        product_image: {
            type: {
                public_id: String,
                url: String
            },
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;