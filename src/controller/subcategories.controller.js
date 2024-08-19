const Subcategories = require("../model/subcategories.model");


const listSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategories.find();

        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Subcategories not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subcategories fetched successfully",
            data: subcategories
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const getSubcategory = async (req, res) => {
    try {
        console.log(req.params.subcategory_id);
        const subcategory = await Subcategories.findById(req.params.subcategory_id);

        if (!subcategory) {
            return res.status(404).json({
                success: false,
                message: "Subcategory not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subcategory fetched successfully",
            data: subcategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const addSubcategory = async (req, res) => {
    try {
        const { category_id, ...rest } = req.body;
        const subcategory = await Subcategories.create({ category_id, ...rest });

        if (!subcategory) {
            return res.status(400).json({
                success: false,
                message: "Subcategory not created"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subcategory created successfully",
            data: subcategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const updateSubcategory = async (req, res) => {
    try {

        const subcategory = await Subcategories.findByIdAndUpdate(req.params.subcategory_id, req.body, { new: true }, { runValidators: true });
        console.log(subcategory);

        if (!subcategory) {
            return res.status(400).json({
                success: false,
                message: "Subcategory not updated"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subcategory updated successfully",
            data: subcategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.findByIdAndDelete(req.params.subcategory_id);

        if (!subcategory) {
            return res.status(404).json({
                success: false,
                message: "Subcategory not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subcategory deleted successfully",
            data: subcategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};


const subcategoryBycategory = async (req, res) => {
    try {
        // const subcategories = await Subcategories.find(req.params.category_id);
        console.log(req.params.category_id);

        const subcategoryBycategory = await Subcategories.find({ category_id: req.params.category_id });
        console.log(subcategoryBycategory);


        if (!subcategoryBycategory || subcategoryBycategory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "subcategoryBycategory not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "subcategoryBycategory fetched successfully",
            data: subcategoryBycategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const countProduct = async (req, res) => {
    try {
        const countproducts = await Subcategories.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "subcategory_id",
                    as: "Product"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    countProduct: {
                        $sum: { $size: "$Product" }
                    }
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "products count successfully",
            data: countproducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const inactivesubcategory = async (req, res) => {
    try {
        const countinactive = await Subcategories.aggregate([
            {
                $match: {
                    "isActive": false
                }
            },
            {
                $count: 'NoOfInActiveSubcategory'
            }
    
        ])
        res.status(200).json({
            success: true,
            data: countinactive
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const parentOfSubcategory = async (req, res) => {

    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $project: {
                "name": 1,
                "category": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);

}

const countActive = async (req, res) => {

    const subcategories = await Subcategories.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $count: "NoOfActiveSubcategories"
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);

}

const mostProducts = async (req, res) => {

    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "subcategory_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "subcategory_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                },
              	"product_name" : {$push : "$product.name"}
            }
        },
        {
            $sort: {
                "CountProduct": -1
            }
        },
        {
            $limit: 5
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);

}


const countProducts = async (req, res) => {

    const subcategories = await Subcategories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "subcategory_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "subcategory_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                },
              	"product_name" : {$push : "$product.name"}
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Subcategories get  succesfully",
        data: subcategories
    })

    console.log(subcategories);

} 


module.exports = {
    listSubcategories,
    getSubcategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    subcategoryBycategory,
    
    countProduct,
    inactivesubcategory,
    parentOfSubcategory,
    mostProducts,
    countActive,
    countProducts
};
