const express = require('express');
const { subcategoriesController } = require('../../../controller');
const router = express.Router();


router.get(
    "/list-subcategories",
    subcategoriesController.listSubcategories
);

router.get(
    "/get-subcategory/:subcategory_id",
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
    "/subcategory-Bycategory/:category_id",
    subcategoriesController.subcategoryBycategory
)

router.get(
    "/count-products",
    subcategoriesController.countProduct
)

router.get(
    "/inactive",
    subcategoriesController.inactivesubcategory
)
router.get(
    "/countProduct",
    subcategoriesController.countProduct
)



router.get(
    "/parentOfSubcategory",
    subcategoriesController.parentOfSubcategory
)
router.get(
    "/mostProducts",
    subcategoriesController.mostProducts
)
router.get(
    "/countActive",
    subcategoriesController.countActive
)
router.get(
    "/countProducts",
    subcategoriesController.countProducts
)


module.exports = router;
