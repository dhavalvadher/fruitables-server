const express = require('express');
const { variantsController } = require('../../../controller');
const upload = require('../../../middleware/upload');


const routes = express.Router();

routes.get(
    '/list-variant',
    variantsController.listVariants
)

routes.get(
    '/get-variant/:variant_id',
    variantsController.getVariant
)

routes.post(
    '/add-variant',
    upload.single("variants_image"),
    variantsController.addVariant
)

routes.put(
    '/update-variant/:variant_id',
    upload.single("variants_image"),
    variantsController.updateVariant
)

routes.delete(
    '/delete-variant/:variant_id',
    variantsController.deleteVariant
)


routes.get(
    '/count-stock/:variant_id',
    variantsController.countstock
)

routes.get(
    '/active',
    variantsController.activevarint
)

routes.get(
    '/count-products',
    variantsController.countptoduct
)

routes.get(
    '/product/:product_id',
    variantsController.variantparticularproduct
)

routes.get(
    '/list-variant/:product_id',
    variantsController.Variantdetails
)

routes.get('/product-highest-Price',
    variantsController.productswithhighesprices
)

routes.get('/multiple-variants',
    variantsController.morethanonevariant
)

routes.get('/low-quantity',
    variantsController.productslowstock
)

module.exports = routes;
