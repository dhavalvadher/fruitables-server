const express = require('express')
const { categoriescontroller } = require('../../../controller')
const validation = require('../../../middleware/validation')
const { categotyValidtion } = require('../../../../validation')

// const { categotyValidtion } = require('../../../../validation')
const auth = require('../../../middleware/auth')

const route = express.Router()

route.get(
    '/list_categories',
    auth(["dhavall","user"]),
    categoriescontroller.listcategory
)

// route.get(
//     '/get_categories/:category_id',
//     validation(categotyValidtion.getCategory),
//     categoriescontroller.getcategories
// )

route.get(
    '/get_categories',
    validation(categotyValidtion.getCategory),
    categoriescontroller.getcategories
)

route.post(
    '/post_categories',
    validation(categotyValidtion.createCategory),
    categoriescontroller.postcategories
)

route.put(
    '/update_categories/:category_id',
    validation(categotyValidtion.updateCategory),
    categoriescontroller.updatecategories
)

route.delete(
    '/delete_categories/:category_id',
    validation(categotyValidtion.deleteCategory),
    categoriescontroller.deletecategories
)

route.get(
    '/count-active',
    categoriescontroller.countactive
)

route.get(
    '/inactive',
    categoriescontroller.inactive
)

route.get(
    '/mostProducts',
    categoriescontroller.mostproducts 
)

route.get(
    '/totalProducts',
    categoriescontroller.totalProducts
)

route.get(
    '/averageproducts',
    categoriescontroller.averageproducts
)

route.get(
    '/specific',
    categoriescontroller.specific
)


module.exports = route 