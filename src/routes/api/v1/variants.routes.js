const express = require('express');
const { controllerVariants } = require('../../../controller');
const upload = require("../../../middleware/upload");

const route = express.Router()

route.get(
    '/get-variant/:variant_id',
    controllerVariants.getVariant
)

route.get(
    '/list-variants',
    controllerVariants.listVariants
)

route.post(
    '/add-variant',
    upload.single('variant_image'),
    controllerVariants.addVariant
)
route.put(
    '/update-variant/:variant_id',
    upload.single('variant_image'),
    controllerVariants.updateVariant
)

route.delete(
    '/delete-variant/:variant_id',
    controllerVariants.deleteVariant
)

route.get(
    '/count-stock/:variant_id',
    controllerVariants.countstock
)

route.get(
    '/active',
    controllerVariants.activevarint
)

route.get(
    '/count-products',
    controllerVariants.countptoduct
)

route.get(
    '/particular-variant/:product_id',
    controllerVariants.variantparticularproduct
)

route.get(
    '/list-variant/:product_id',
    controllerVariants.Variantdetails
)

route.get(
    '/low-quantity',
    controllerVariants.productslowstock
)
route.get(
    '/high-price',
    controllerVariants.productswithhighesprices
)
route.get(
    '/multiple-variants',
    controllerVariants.morethanonevariant
)
module.exports = route;