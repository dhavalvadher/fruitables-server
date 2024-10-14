const express = require('express');
const { subcategoriesController } = require('../../../controller');
const router = express.Router();


router.get(
    "/list-subcategories",
    subcategoriesController.listSubcategories
);

router.get(
    "/get-subcategories/:subcategory_id",
    subcategoriesController.getSubcategory
);

router.post(
    "/create-subcategory",
    subcategoriesController.addSubcategory
);

router.put(
    "/update-subcategory/:subcategory_id",
    subcategoriesController.updateSubcategory
);

router.delete(
    "/delete-subcategory/:subcategory_id",
    subcategoriesController.deleteSubcategory
);

router.get(
    '/get-subcategoryBycategory/:subcategory_id',
    subcategoriesController.getSubcategoryByCtegory
)

router.get(
    '/count-products',
    subcategoriesController.countProducts
)

router.get(
    '/inactive',
    subcategoriesController.listOfSubcategory
)

router.get(
    '/parent-of-subcategory/:category_id',
    subcategoriesController.subcategorioncategory
)

router.get(
    '/most-products',
    subcategoriesController.highestcategori
)

router.get(
    '/count-active',
    subcategoriesController.activesubcategory
)

module.exports = router;
