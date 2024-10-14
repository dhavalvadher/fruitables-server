const { default: mongoose } = require("mongoose");
const Products = require("../model/products.model");
const uploadFile = require("../utils/cloudinary");


const listProducts = async (req, res) => {
    try {
        const products = await Products.find();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Products not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const getProduct = async (req, res) => {
    try {
        console.log(req.params.product_id);
        const products = await Products.findById(req.params.product_id);

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const addProducts = async (req, res) => {

    console.log("add image", req.file);


    try {
        // console.log(req.body);
        // console.log(req.file);

        const fileRes = await uploadFile(req.file.path, "Product");
        console.log(fileRes);


        // const { subcategory_id, ...productData } = req.body;


        const products = await Products.create({
            ...req.body,
            product_image: {
                public_id: fileRes.public_id,
                url: fileRes.url
            },
        });

        if (!products) {
            return res.status(400).json({
                success: false,
                message: "Product not created"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const updateProducts = async (req, res) => {

    // console.log("abcd", req.params.product_id, req.body, req.file);




    if (req.file) {
        console.log("New Image");

        const fileRes = await uploadFile(req.file.path, "Products")

        const product = await Products.findByIdAndUpdate(req.params.product_id,
            {
                ...req.body,
                product_image: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            }
        );

        console.log(req.params);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }


        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })


    } else {
        console.log("Old image");

        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });


        console.log(req.params);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })
    }


    // try {

    //     const products = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true }, { runValidators: true });
    //     console.log(products);

    //     if (!products) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Product not updated"
    //         });
    //     }

    //     res.status(200).json({
    //         success: true,
    //         message: "Product updated successfully",
    //         data: products
    //     });

    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error: " + error.message
    //     });
    // }
}

const deleteProducts = async (req, res) => {
    try {
        const products = await Products.findByIdAndDelete(req.params.product_id);

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const getProductBySubcategory = async (req, res) => {
    try {
        const product = await Products.find({ product_id: req.params.product_id })
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'product fetch successfully.',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const Countcategory = async (req, res) => {
    console.log("ok");

    const Countcategory = await Products.aggregate(
        [
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: {
                    path: "$category",

                }
            },
            {
                $group: {
                    _id: "$category_id",
                    Category_name: { $first: "$category.name" },
                    Product_name: { $first: "$name" },
                    countproduct: {
                        $sum: 1
                    }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'product fetch successfully.',
        data: Countcategory
    })
    console.log(Countcategory);
}

const outofstock = async (req, res) => {
    console.log("ok");

    const outofstock = await Products.aggregate([
        {
            "$match": {
                "isActive": true
            }
        },
        {
            "$lookup": {
                "from": "variants",
                "localField": "_id",
                "foreignField": "product_id",
                "as": "variants"
            }
        },
        {
            "$match": {
                "variants": { "$size": 0 }
            }
        },
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "description": 1,
                "price": 1,
                "stock": 1
            }
        }
    ]
    )
    res.status(200).json({
        success: true,
        message: 'product fetch successfully.',
        data: outofstock
    })
    console.log(outofstock);
}

const productByCategory = async (req, res) => {
    console.log("ok");
    const productByCategory = await Products.aggregate(
        [
            // {
            //     $match: {
            //         category_id: new mongoose.Types.ObjectId(category_id)
            //     }
            // },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    category: {
                        $first: "$name"
                    },
                    ProdcutCount: {
                        $sum: 1
                    },
                    product: {
                        $push: "$categories.name"
                    }
                }
            },
            {
                $unwind: "$product"
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'product fetch successfully.',
        data: productByCategory
    })
    console.log(productByCategory);
}

const topRate = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "review"
            }
        },
        {
            $unwind: {
                path: "$review"
            }
        },
        {
            $group: {
                _id: "$_id",
                product_name: { $first: "$name" },
                Totalrating: {
                    $sum: "$review.rating"
                },
                totalperson: {
                    $sum: 1
                }
            }
        },
        {
            $addFields: {
                avgbyrate: {
                    $divide: ["$Totalrating", "$totalperson"]
                }
            }
        },
        {
            $sort: {
                avgbyrate: -1
            }
        },
        {
            $limit: 1
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const newArrivals = async (req, res) => {

    const products = await Products.aggregate([
        {
            $sort: {
                "createdAt": -1
            }
        },
        {
            $limit: 3
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const discounts = async (req, res) => {
    const discounts = await Products.aggregate(
        [
            {
                "$match": {
                    "isActive": true
                }
            },
            {
                "$lookup": {
                    "from": "categories",
                    "localField": "category_id",
                    "foreignField": "_id",
                    "as": "category"
                }
            },
            {
                "$lookup": {
                    "from": "subcategories",
                    "localField": "subcategory_id",
                    "foreignField": "_id",
                    "as": "subcategory"
                }
            },
            {
                "$unwind": "$category"
            },
            {
                "$unwind": "$subcategory"
            },
            {
                "$group": {
                    "_id": {
                        "category_id": "$category_id",
                        "subcategory_id": "$subcategory_id"
                    },
                    "category_name": { "$first": "$category.name" },
                    "subcategory_name": { "$first": "$subcategory.name" },
                    "products": {
                        "$push": {
                            "_id": "$_id",
                            "name": "$name",
                            "description": "$description",
                            "price": "$price",
                            "stock": "$stock"
                        }
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "category_id": "$_id.category_id",
                    "subcategory_id": "$_id.subcategory_id",
                    "category_name": 1,
                    "subcategory_name": 1,
                    "products": 1
                }
            }
        ]

    )
    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: discounts
    })
}

const variantsDatils = async (req, res) => {
    const variantsDatils = await Products.aggregate(
        [
            {
                "$lookup": {
                    "from": "variants",
                    "localField": "_id",
                    "foreignField": "product_id",
                    "as": "variants"
                }
            },
            {
                "$unwind": {
                    "path": "$variants",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "name": 1,
                    "description": 1,
                    "price": 1,
                    "stock": 1,
                    "variants": {
                        "_id": "$variants._id",
                        "variant_name": "$variants.name",
                        "variant_price": "$variants.price",
                        "variant_stock": "$variants.stock",
                        "variant_details": "$variants.details"
                    }
                }
            }
        ]

    )
    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: variantsDatils
    })
}

const searchProducts = async (req, res) => {
    try {
        const { sortOrder, rating, max, min, category, page, limit } = req.body

        const metchpip = {}

        if (rating) {
            metchpip['avgRating'] = {
                $gte: rating
            }
        }

        if (category) {
            metchpip['category_id'] = category
        }

        metchpip['variants.attributes.Price'] = {

        }

        if (max != undefined) {
            metchpip['variants.attributes.Price'].$lte = parseInt(min)
        }

        if (min != undefined) {
            metchpip['variants.attributes.Price'].$gte = parseInt(max)
        }

        console.log(metchpip);

        const pipeline = [
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variants"
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $unwind: "$variants"
            },
            {
                $match: metchpip
            },
            {
                $group: {
                    _id: '$_id',
                    "name": { $first: '$name' },
                    "variants": { $push: "$variants" },
                    "reviews": { $push: "$reviews" }
                }
            },
            {
                $sort: {
                    name: sortOrder === "acs" ? 1 : -1
                }
            }
        ]

        if (parseInt(page) > 0 && parseInt(limit) > 0) {
            pipeline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) })
            pipeline.push({ $limit: parseInt(limit) })
        }

        const data = await Products.aggregate(pipeline);
        console.log(data);

        res.status(200).json({
            success: true,
            message: 'Product aggregate successfully.',
            data: data
        });

    } catch (error) {
        console.log(error);

    }
}



module.exports = {
    listProducts,
    addProducts,
    updateProducts,
    deleteProducts,
    getProduct,
    newArrivals,
    variantsDatils,
    getProductBySubcategory,
    searchProducts,
    discounts,
    topRate,
    Countcategory,
    productByCategory,
    outofstock
}