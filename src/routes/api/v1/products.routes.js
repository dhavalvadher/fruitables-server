const express = require('express');
const upload = require('../../../middleware/upload');
const { controllerProducts } = require('../../../controller');

const route = express.Router();

route.get(
    "/list-products",
    controllerProducts.listProducts
);

route.get("/get-product/:product_id", 
    controllerProducts.getProduct
);

route.post(
    "/create-product",
    upload.single("product_image"),
    controllerProducts.addProducts
);

route.put(
    "/update-product/:product_id",
    upload.single("product_image"),
    controllerProducts.updateProducts
);

route.delete(
    "/delete-product/:product_id",
    controllerProducts.deleteProducts
);

route.get(
    "/new-arrivals",
    controllerProducts.newArrivals
);

route.get(
    '/variant-details/:product_id',
    controllerProducts.variantsDatils
)

route.get('/search-productes',
    controllerProducts.searchProducts
);

route.get(
    '/count-categories',
    controllerProducts.Countcategory
)

route.get(
    '/out-of-stock',
    controllerProducts.outofstock
)

route.get(
    '/productByCategory/:category_id',
    controllerProducts.productByCategory
)

route.get(
    '/get-ProductBySubcategory/:subcategory_id',
    controllerProducts.getProductBySubcategory
)
route.get(
    '/top-rated',
    controllerProducts.topRate
)


route.get(
    '/discounts',
    controllerProducts.discounts
)
module.exports = route;