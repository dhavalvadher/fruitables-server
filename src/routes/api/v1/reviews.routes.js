const express = require('express');
const { reviewsController } = require('../../../controller');


const route = express.Router()

route.get(
    '/list-review', 
    reviewsController.listReviews
)

route.get(
    '/get-review/:reviews_id', 
    reviewsController.getReviews
)

route.post(
    '/create-review', 
    reviewsController.creatReviews
)

route.put(
    '/update-review/:reviews_id',
    reviewsController.updateReviews
)

route.delete(
    '/delete-review/:reviews_id',
    reviewsController.deleteReviews
)

route.get(
    '/approveAndreject/:status/:reviews_id', 
    reviewsController.approveAndrejectReviews
)

route.get(
    '/user/:user_id', 
    reviewsController.reviewofuser
)

route.get(
    '/product/:product_id', 
    reviewsController.reviewofproduct
)

route.get(
    '/top-rated-products', 
    reviewsController.toprate
)

route.get(
    '/with-comments', 
    reviewsController.withcomment
)

route.get(
    '/count-products', 
    reviewsController.countProduct
)
module.exports = route;
