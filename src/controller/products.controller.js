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



    try {
        console.log(req.body);
        console.log(req.file);

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



const productsByCategory = async (req, res) => {

    const products = await Products.aggregate([

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
                path: "$category"
            }
        },
        {
            $project: {
                "name": 1,
                "product_img.url": 1,
                "category": 1
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsBySubcategory = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "subcategories",
                localField: "subcategory_id",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: {
                path: "$subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "product_img.url": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const topRatating = async (req, res) => {

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
                "product_name": { $first: "$name" },
                "Totalrating": {
                    $sum: "$review.rating"
                }
            }
        },
        {
            $sort: {
                "Totalrating": -1
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

const countCategories = async (req, res) => {

    const products = await Products.aggregate([
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
                path: "$category"
            }
        },
        {
            $group: {
                _id: "$category._id",
                "category_name": { $first: "$category.name" },
                "product_name": { $push: "$name" },
                "TotalProduct": {
                    $sum: 1
                }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}


// const searchProducts = async (req, res) => {
//     try {
//         const { sortOrder, rating, max, min, category, page, limit } = req.body


//         const matchPip = {}

//         if (rating) {
//             matchPip['avgRating'] = { "$gte": rating }
//         }
//         if (category) {
//             matchPip['category_id'] = category
//         }

//         matchPip['variant.attributes.Price'] = {}

//         if (min != undefined) {
//             matchPip['variant.attributes.Price'].$gt = min
//         }

//         if (max != undefined) {
//             matchPip['variant.attributes.Price'].$lte = max
//         }

//         console.log(matchPip);

//         const pipline = [

//             {
//                 $lookup: {
//                     from: "reviews",
//                     localField: "_id",
//                     foreignField: "product_id",
//                     as: "review"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "variants",
//                     localField: "_id",
//                     foreignField: "product_id",
//                     as: "variant"
//                 }
//             },
//             {
//                 $addFields: {
//                   avgrating:'$review.rating'
//                 }
//               },
//             {
//                 $unwind: {
//                     path: "$variant"
//                 }
//             },
//             {
//                 $match: matchPip
//             },
//             {
//                 $group: {
//                     _id: "$_id",
//                     "name": { $first: "$name" },
//                     "review": { $push: "$review" },
//                     "variant": { $push: "$variant" }
//                 }
//             },
//             {
//                 $sort: {
//                     name: sortOrder === 'asc' ? 1 : -1
//                 }
//             }
//         ]

//         if (page > 0 && limit > 0) {
//             pipline.push({ $skip: (page - 1) * limit })
//             pipline.push({ $limit: limit })
//         }

//         const data = await Products.aggregate(pipline)
//         console.log(req.query)
//         console.log(JSON.stringify(data));


//         res.status(400).json({
//             success: true,
//             message: "Product data fected",
//             data: data
//         })

//     } catch (error) {
//         console.log(error.message);

//     }
// }



const Search = async (req, res) => {
    // localhost:8000/api/v1/products/Search?sortOrder=asc&rating=4&max=10000&min=0&category=1&page=2&limit=1
    try {
        const { sortOrder, rating, max, min, category, page, limit } = req.query

        let p = parseInt(page);
        let l = parseInt(limit);

        const matchPip = {}

        if (rating) {
            matchPip['avgRating'] = { "$gte": rating }
        }
        if (category) {
            matchPip['category_id'] = category
        }

        matchPip['variant.attributes.Price'] = {}

        if (min != undefined) {
            matchPip['variant.attributes.Price'].$gt = min
        }

        if (max != undefined) {
            matchPip['variant.attributes.Price'].$lte = max
        }

        // console.log(matchPip);

        const pipline = [
            {
              $lookup: {
                from: 'variants',
                localField: '_id',
                foreignField: 'product_id',
                as: 'variant'
              }
            },
            {
              $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'product_id',
                as: 'review'
              }
            },
            {
              $addFields: {
                avgrating:'$review.rating'
              }
            },
            {
              $unwind: {
                path: '$variant',
                
              }
            },
            {
              $match: {
                   avgrating:{$gte:4},
                category_id:1,
                'variant.attributes.Price':{$gte:0 , $lte:2000}
              }
            },
            {
              $group: {
                _id: '$_id',
                name:{$first:'$name'},
               variant:{$push:"$variant"},
                review:{$push:"$review"}
                }
            },
            {
              $sort: {
                name: sortOrder === 'asc' ?1 : -1
              }
            }
          ]

        //   console.log(p,l);
          
        if (p > 0 && l > 0) {
            pipline.push({ $skip: (p - 1) * l })
            pipline.push({ $limit:  l })
        }

        // console.log(JSON.stringify(pipline));
        

        const data = await Products.aggregate(pipline)
        // console.log(req.query)
        // console.log(data);


        res.status(400).json({
            success : true,
            message : "Product data fected",
            data : data
        })

    } catch (error) {
        console.log(error.message);

    }
}

module.exports = {
    listProducts,
    addProducts,
    updateProducts,
    deleteProducts,
    getProduct,
    productsByCategory,
    productsBySubcategory,
    topRatating,
    newArrivals,
    countCategories,
    Search

}