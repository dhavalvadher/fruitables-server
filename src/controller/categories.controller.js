const Categories = require("../model/categories.model");
const mongoose = require("mongoose");

const listcategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        if (page <= 0 || pageSize <= 0) {
            return res.status(400).json({
                success: false,
                message: "Page or pageSize must be greater than zero",
            });
        }

        const categories = await Categories.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Categories not found",
            });
        }

        const startIndex = (page - 1) * pageSize;
        const pagination = categories.slice(startIndex, startIndex + pageSize);

        return res.status(200).json({
            success: true,
            totalData: categories.length,
            message: "Categories fetched successfully",
            data: pagination,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const getcategories = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.category_id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};


const postcategories = async (req, res) => {
    try {
        const category = await Categories.create(req.body);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category not created",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const deletecategories = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.category_id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const updatecategories = async (req, res) => {
    try {
        const category = await Categories.findByIdAndUpdate(
            req.params.category_id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category not updated",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const countActive = async (req, res) => {
    try {
        const category = await Categories.aggregate([
            { $match: { isActive: true } },
            { $count: "ActiveCategory" },
        ]);

        return res.status(200).json({
            success: true,
            message: "Active category count",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const countinActive = async (req, res) => {
    try {
        const category = await Categories.aggregate([{ $match: { isActive: false } }]);

        return res.status(200).json({
            success: true,
            message: "Inactive category count",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const highestnum = async (req, res) => {
    try {
        const highestnumproduct = await Categories.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "products",
                },
            },
            {
                $project: {
                    categoryName: "$name",
                    productCount: { $size: "$products" },
                },
            },
            { $sort: { productCount: -1 } },
            { $limit: 3 },
        ]);

        return res.status(200).json({
            success: true,
            message: "Highest number of products per category retrieved successfully",
            data: highestnumproduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const countsubcategories = async (req, res) => {
    try {
        const countsubcategori = await Categories.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "Subacategory",
                },
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$name",
                    countsubcategories: { $size: "$Subacategory" },
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Subcategory count retrieved successfully",
            data: countsubcategori,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const subcategorioncategories = async (req, res) => {
    const { category_id } = req.params;

    try {
        const retviecategoryonsubcate = await Categories.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(category_id),
                },
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategories",
                },
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$name",
                    subcategories: "$subcategories",
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Subcategories retrieved successfully",
            data: retviecategoryonsubcate[0], // Assuming single category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving subcategories",
            error: error.message,
        });
    }
};

const totalProduct = async (req, res) => {
    try {
        const count = await Categories.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category_id",
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
                    "category_name": { $first: "$name" },
                    "TotalProduct": {
                        $sum: 1
                    },
                    "product_name": { $push: "$product.name" }
                }
            },
            {
                $group: {
                    _id: null,
                    categories: {
                        $push: {
                            _id: "$_id",
                            category_name: "$category_name",
                            TotalProduct: "$TotalProduct"
                        }
                    },
                    OverallTotalProduct: { $sum: "$TotalProduct" }
                }
            },
            {
                $unwind: "$categories"
            },
            {
                $project: {
                    _id: "$categories._id",
                    category_name: "$categories.category_name",
                    TotalProduct: "$categories.TotalProduct",
                    CategoryAvg: {
                        $divide: ["$categories.TotalProduct", "$OverallTotalProduct"]
                    }
                }
            }
        ])

        return res.status(200).json({
            success: true,
            message: "Total products count retrieved successfully",
            data: count,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const specific = async (req, res) => {
    try {
        const categories = await Categories.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategory",
                },
            },
            {
                $project: {
                    name: 1,
                    subcategory: 1,
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

module.exports = {
    listcategory,
    getcategories,
    postcategories,
    deletecategories,
    updatecategories,
    countActive,
    countinActive,
    highestnum,
    countsubcategories,
    subcategorioncategories,
    totalProduct,
    specific,
};

