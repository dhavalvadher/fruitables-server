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
    '/get_categories/:category_id',
    validation(categotyValidtion.getCategory), // Use correct validation schema
    categoriescontroller.getcategories
);

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
    '/getActive',
    categoriescontroller.countActive
)

route.get(
    '/getInactive',
    categoriescontroller.countinActive
)

route.get(
    '/most-products',
    categoriescontroller.highestnum
)
route.get(
    '/count-subcategories',
    categoriescontroller.countsubcategories
)
route.get(
    '/category-subcategory/:category_id',
    categoriescontroller.subcategorioncategories
)
route.get(
    '/average-products',
    categoriescontroller.totalProduct
)
route.get(
    '/specific/:category_id',
    categoriescontroller.specific
)
module.exports = route 