const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    paymentType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    order_id: {
        type: mongoose.Types.ObjectId,
        ref: "Orders",
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const Payments = mongoose.model("Payments", orderSchema)

module.exports = Payments