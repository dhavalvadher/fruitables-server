const mongoose = require('mongoose')


const categoriesSchema = new mongoose.Schema(
    {
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
        image: {
            type: String,
            trim: true
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

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;


