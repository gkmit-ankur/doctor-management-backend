const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional()
});

const userIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    userIdParamSchema
};