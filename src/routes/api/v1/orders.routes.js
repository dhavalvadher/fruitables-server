const express = require('express');
const { controllerOrder } = require('../../../controller');


const route = express.Router()

route.get(
    '/get-order/:order_id',
    controllerOrder.getOrder
)
route.get(
    '/list-order',
    controllerOrder.listOrder
)
route.put(
    '/update-order/:order_id',
    controllerOrder.updateOrder
)


route.delete(
    '/delete-order/:order_id',
    controllerOrder.deleteorders
)


route.get(
    '/user/:user_id', 
    controllerOrder.alluser
)

route.get(
    '/seller/:user_id', 
    controllerOrder.allsellar
)

route.get(
    '/product/:product_id', 
    controllerOrder.allproduct
)

route.get(
    '/cancel', 
    controllerOrder.cancelorder
)

route.post(
    '/place-order',
    controllerOrder.placeOrder
)


module.exports = route;