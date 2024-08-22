const Joi = require("joi");

const getCategory = {
    query: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        description: Joi.string().required().max(30),
        image: Joi.string().allow('')
    })
}

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        description: Joi.string().required().max(30),
        image: Joi.string().allow('')
    })
}
const updateCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        description: Joi.string().required().max(30),
        image: Joi.string().allow(''),
        isActive: Joi.boolean().required(),
        _id: Joi.string().required(),
        createdAt:  Joi.string().required(),
        updatedAt: Joi.string().required()
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required().max(24)
    })
}
const deleteCategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required().max(24)
    })
}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}