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

module.exports = routes;
