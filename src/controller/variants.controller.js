const Variants = require("../model/variants.model");
const uploadFile = require("../utils/cloudinary");

// Helper function to send error responses
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message: message
    });
};

// List all variants
const listVariants = async (req, res) => {
    try {
        const variants = await Variants.find();
        if (!variants || variants.length === 0) {
            return sendErrorResponse(res, 404, "Variant data not found");
        }
        res.status(200).json({
            success: true,
            message: "Variant data fetched",
            data: variants,
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Internal server error: " + error.message);
    }
};

// Get a single variant by ID
const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id);
        if (!variant) {
            return sendErrorResponse(res, 404, "Data not found");
        }
        res.status(200).json({
            success: true,
            message: "Variant data fetched",
            data: variant,
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Internal server error: " + error.message);
    }
};

// Add a new variant
const addVariant = async (req, res) => {
    try {
        const fileRes = await uploadFile(req.file.path, "Variant").catch(error => {
            sendErrorResponse(res, 500, "File upload failed: " + error.message);
            return;
        });

        const variantData = {
            ...req.body,
            variants_image: {
                public_id: fileRes.public_id,
                url: fileRes.url
            },
        };

        const variant = await Variants.create(variantData);
        if (!variant) {
            return sendErrorResponse(res, 400, "Product not created");
        }

        res.status(201).json({
            success: true,
            message: "Variant added successfully",
            data: variant,
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Internal server error: " + error.message);
    }
};

// Update an existing variant
const updateVariant = async (req, res) => {
    try {
        const updatedVariant = await Variants.findByIdAndUpdate(
            req.params.variant_id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedVariant) {
            return sendErrorResponse(res, 400, "Bad request");
        }
        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            data: updatedVariant,
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Internal server error: " + error.message);
    }
};

// Delete a variant
const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);
        if (!variant) {
            return sendErrorResponse(res, 404, "Variant not found");
        }
        res.status(200).json({
            success: true,
            message: "Variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Internal server error: " + error.message);
    }
};

const countstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $group: {
            _id: "$product_id",
            totalStock: { $sum: "$stock" }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        {
          $project: {
            productId: "$_id",
            totalStock: 1,
            "productDetails.name": 1,
            "productDetails.description": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}
const activevarint = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $match: {
                is_active: true
            }
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const countptoduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id", 
                countVariants: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 1, 
                product_id: "$_id",
                countVariants: 1 
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const variantparticularproduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        },
        // {
        //     $match: {
        //         "productDetails.name": "radishes" 
        //     }
        // },
        {
          $project: {
            _id: 1,
            categori_id: 1,
            subcategori_id: 1,
            product_id: 1,
            price: 1,
            stock: 1,
            discount: 1,
            attributes: 1,
            isActive: 1,
            createdAt: 1,
            updatedAt: 1,
            "productDetails._id": 1,
            "productDetails.name": 1,
            "productDetails.description": 1,
            "productDetails.price": 1,
            "productDetails.stock": 1,
            "productDetails.isActive": 1,
            "productDetails.createdAt": 1,
            "productDetails.updatedAt": 1
          }
        }
      ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const Variantdetails = async (req, res) => {
    const variants = await Variants.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $project: {
          _id: 1,
          categori_id: 1,
          subcategori_id: 1,
          product_id: 1,
          price: 1,
          stock: 1,
          discount: 1,
          attributes: 1,
          isActive: 1,
          createdAt: 1,
          updatedAt: 1,
          "productDetails._id": 1,
          "productDetails.name": 1,
          "productDetails.description": 1,
          "productDetails.price": 1,
          "productDetails.stock": 1,
          "productDetails.isActive": 1,
          "productDetails.createdAt": 1,
          "productDetails.updatedAt": 1
        }
      }
    ])
    res.status(200).json({
      success: true,
      message: "variant get  succesfully",
      data: variants
    })
  
    console.log(variants);
  }

const productswithhighesprices = async (req, res) => {
    const variants = await Variants.aggregate([
      {
        $sort: {
          price: -1
        }
      },
      {
        $group: {
          _id: "$product_id",
          highestPrice: { $max: "$price" },
          variants: {
            $push: {
              variant_id: "$_id",
              price: "$price",
              stock: "$stock",
              discount: "$discount",
              attributes: "$attributes"
            }
          }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          highestPrice: 1,
          variants: 1,
          "productDetails.name": 1,
          "productDetails.description": 1
        }
      },
      {
        $sort: {
          highestPrice: -1
        }
      }
    ])
  
    res.status(200).json({
      success: true,
      message: "variant get  succesfully",
      data: variants
    })
  
    console.log(variants);
  }

  const morethanonevariant = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id",
                variantCount: { $sum: 1 },
                variants: {
                    $push: {
                        variant_id: "$_id",
                        price: "$price",
                        stock: "$stock",
                        discount: "$discount",
                        attributes: "$attributes"
                    }
                }
            }
        },
        {
            $match: {
                variantCount: { $gt: 1 }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 0,
                productId: "$_id",
                variantCount: 1,
                variants: 1,
                "productDetails.name": 1,
                "productDetails.description": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const productslowstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $match: {
                stock: { $lt: 20 }
            }
        },
        {
            $group: {
                _id: "$product_id",
                totalStock: { $sum: "$stock" },
                variants: {
                    $push: {
                        variant_id: "$_id",
                        stock: "$stock",
                        price: "$price",
                        discount: "$discount",
                        attributes: "$attributes"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },

        {
            $project: {
                _id: 0,
                productId: "$_id",
                totalStock: 1,
                variants: 1,
                "productDetails.name": 1,
                "productDetails.description": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

module.exports = {
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant,
    productslowstock,
    morethanonevariant,
    productswithhighesprices,
    countstock,
    activevarint,
    countptoduct,
    variantparticularproduct,
    Variantdetails
};
