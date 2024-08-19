// // const Variants = require("../model/variants.model");


// // const listVariants = async (req, res) => {
// //     try {
// //         const variant = await Variants.find()
// //         console.log(variant);


// //         if (!variant || variant.length === 0) {
// //             res.status(404).json({
// //                 success: false,
// //                 message: "variant data not found",
// //             });
// //         }
// //         res.status(200).json({
// //             success: true,
// //             message: "variant data fetched",
// //             data: variant,
// //         });


// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Internal server error" + error.message
// //         })
// //     }
// // }

// // const getVariant= async (req, res) => {
// //     try {
// //         const variant = await Variants.findById(req.params.variant_id)
// //         if (!variant) {
// //             res.status(404).json({
// //                 success: false,
// //                 message: "Data not found." + error.message
// //             })
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: "Variant Data fetched",
// //             data: variant
// //         })


// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Internal server error" + error.message
// //         })
// //     }
// // }
// // const addVariant = async (req, res) => {
// //     console.log("hahhaa", req.body);
// //     console.log(req.file);
// //     try {
// //         console.log(req.body);
// //         const variant = await Variants.create(req.body);
// //         if (!variant) {
// //             res.status(400).json({
// //                 success: true,
// //                 message: "failed to added variant",
// //                 data: variant,
// //             });
// //         }
// //         res.status(201).json({
// //             success: true,
// //             message: "variant added successfully",
// //             data: variant,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Internal server error: " + error.message,
// //         });
// //     }

// // }

// // const updateVariant = async (req, res) => {
// //     console.log("jdghdgh", req.body);
// //     try {
// //         const updatedVariant = await Variants.findByIdAndUpdate(
// //             req.params.variant_id,
// //             req.body,
// //             { new: true, runValidators: true }
// //         );

// //         console.log(updatedVariant);

       
// //             if (!updatedVariant) {
// //                 res.status(400).json({
// //                     success: false,
// //                     message: "Bad request",
// //                 });

// //             };
// //             res.status(201).json({
// //                 success: true,
// //                 message: "Variant updated successfully",
// //                 data: updatedVariant,
// //             });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Internal server error: " + error.message,
// //         });
// //     }
// // }

// // const deleteVariant = async (req, res) => {
// //     try {
// //         const variant = await Variants.findByIdAndDelete(req.params.variant_id);

// //         if (!variant) {
// //             res.status(404).json({
// //                 success: false,
// //                 message: "variant not found",
// //             });
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: "variant deleted successfully",
// //             data: variant,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Internal server error: " + error.message,
// //         });
// //     }
// // }

// // module.exports={
// //     listVariants,
// //     getVariant,
// //     addVariant,
// //     updateVariant,
// //     deleteVariant
// // }


// const Variants = require("../model/variants.model");
// const uploadFile = require("../utils/cloudinary");

// const listVariants = async (req, res) => {
//     try {
//         const variants = await Variants.find();
//         if (!variants || variants.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Variant data not found",
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Variant data fetched",
//             data: variants,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message,
//         });
//     }
// }

// const getVariant = async (req, res) => {
//     try {
//         const variant = await Variants.findById(req.params.variant_id);
//         if (!variant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Data not found",
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Variant data fetched",
//             data: variant,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message,
//         });
//     }
// }

// const addVariant = async (req, res) => {
//     try {
//         console.log(req.body);
//         console.log(req.file);

//         const fileRes = await uploadFile(req.file.path, "Variant");
//         console.log(fileRes);


//         const variant = await Variants.create({
//             ...req.body,
//             variants_image: {
//                 public_id: fileRes.public_id,
//                 url: fileRes.url
//             },
//         });

//         if (!variant) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Product not created"
//             });
//         }
        
//         // const variant = await Variants.create(req.body);


//         res.status(201).json({
//             success: true,
//             message: "Variant added successfully",
//             data: variant,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message,
//         });
//     }
// }

// const updateVariant = async (req, res) => {
//     try {
//         const updatedVariant = await Variants.findByIdAndUpdate(
//             req.params.variant_id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedVariant) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Bad request",
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Variant updated successfully",
//             data: updatedVariant,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message,
//         });
//     }
// }

// const deleteVariant = async (req, res) => {
//     try {
//         const variant = await Variants.findByIdAndDelete(req.params.variant_id);
//         if (!variant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Variant not found",
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Variant deleted successfully",
//             data: variant,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message,
//         });
//     }
// }

// module.exports = {
//     listVariants,
//     getVariant,
//     addVariant,
//     updateVariant,
//     deleteVariant,
// }
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

module.exports = {
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant,
};
