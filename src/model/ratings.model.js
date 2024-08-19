const mongoose = require('mongoose')


const ratingsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            require: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            required: true
        },
        rating: {
            type: Number,
            required: false
        },
        review: {
            type: String,
            required: false
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

const Ratings = mongoose.model("Ratings", ratingsSchema);

module.exports = Ratings;