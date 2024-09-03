const Categories = require("../model/categories.model");

const listcategory = async (req, res) => {

    // console.log("cateee", req.query.page, req.query.pageSize);

    try {
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);

        if (page <= 0 || pageSize <= 0) {
            res.status(400).json({
                success: false,
                message: "page or pageSize must be grater than zero"
            })
        }

        const categories = await Categories.find();

        console.log(categories);
        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            })
        }

        let startIndex = 0, endIndex = 0, pagination = [...categories];

        if (page > 0 || pageSize > 0) {
            startIndex = (page - 1) * pageSize;
            endIndex = startIndex + pageSize;
            pagination = categories.slice(startIndex,endIndex)
        }

        res.status(200).json({
            success: true,
            totalData:categories.length,
            message: "categories feched successfully",
            data: pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}

const getcategories = async (req, res) => {
    try {

        console.log(req.params.category_id);

        const category = await Categories.findById(req.params.category_id);
        console.log(category);


        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category fetched sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}

const postcategories = async (req, res) => {

    console.log("dhavhvqdhws", req.body);

    try {
        console.log(req.body);

        const category = await Categories.create(req.body);
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Category careted sucessfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}

const deletecategories = async (req, res) => {
    try {

        console.log(req.params.category_id);

        const category = await Categories.findByIdAndDelete(req.params.category_id);
        console.log(category);


        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category fetched sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}

const updatecategories = async (req, res) => {
    console.log("hdbdjwh",req.params.category_id, req.body);



    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true }, { runValidators: true });
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not update."
            })
        }

        res.status(200).json({
            success: true,
            message: "Category update sucessfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}

const countactive = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
                $match: {
                    isActive: true
                }
            },
            {
                $count: 'count-of-active-categories'
            }
        ]
    ])
    res.status(200).json({
        success: true,
        data: activeCount
    })
    console.log(activeCount);

}

const inactive = async (req, res) => {
    const inactiveCount = await Categories.aggregate([

        {
            $match: {
                isActive: false
            }
        }

    ])
    res.status(200).json({
        success: true,
        data: inactiveCount
    })
    console.log(inactiveCount);
}

const mostproducts = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
                $match: {
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "products"
                }
            },
            {
                $project: {
                    categoryName: "$name",
                    productCount: { $size: "$products" }
                }
            },
            {
                $sort: {
                    productCount: -1
                }
            },
            {
                $limit: 3
            }
        ]

    ])
    res.status(200).json({
        success: true,
        message: "Highest products get sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}

const totalProducts = async (req, res) => {
    const totalProductsPerCategory = await Categories.aggregate([
        [
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategory"
                }
            },
            {
                $match: {
                    subcategory: { $ne: [] }
                }
            },
            {
                $unwind: "$subcategory"
            },
            {
                $group: {
                    _id: "$_id",
                    category_name: { $first: "$category_name" },
                    countsubcategories: {
                        $sum: 1
                    },
                    subcategories_name: {
                        $push: "$subcategory.subcategory_name"
                    }
                }
            }
        ]
    ]);
    res.status(200).json({
        success: true,
        data: totalProductsPerCategory
    });
};

const averageproducts = async (req, res) => {
    const totalProducts = await Categories.aggregate([
        [
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "products"
                }
            },
            {
                $match: {
                    products: { $ne: [] }
                }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$_id",
                    category_name: { $first: "$category_name" },
                    "Total-products": {
                        $sum: 1
                    }
                }
            }
        ]
    ]);
    res.status(200).json({
        success: true,
        data: totalProducts
    });
};

const specific = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}




module.exports = {
    listcategory,
    getcategories,
    postcategories,
    deletecategories,
    updatecategories,
    countactive,
    inactive,
    mostproducts,
    totalProducts,
    averageproducts,
    specific
}