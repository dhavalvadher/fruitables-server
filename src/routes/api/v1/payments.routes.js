
const express = require('express');
const { controllerPayment } = require('../../../controller');

const route = express.Router()

route.get(
    '/list-payment',
    controllerPayment.listPayments
)

route.get(
    '/get-payment/:payment_id',
    controllerPayment.getPaymentsOrder
)

route.post(
    '/create-payment',
    controllerPayment.creatPayment
)

route.get(
    '/order/:order_id',
    controllerPayment.Paymentdetailsorder
)

route.delete(
    '/delete-payment/:payment_id',
    controllerPayment.deletepayment
)

route.put(
    '/update-payment/:payment_id',
    controllerPayment.updatepayment
)

module.exports = route;
