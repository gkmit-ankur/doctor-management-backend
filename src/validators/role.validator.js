const Joi = require('joi');

const createRoleSchema = Joi.object({
    key: Joi.string().min(1).max(20).required(),
    title: Joi.string().min(1).max(50).required(),
    
});

const updateRoleSchema = Joi.object({
    key: Joi.string().min(1).max(20).optional(),
    title: Joi.string().min(1).max(50).optional(),
    
});

const roleIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    createRoleSchema,
    updateRoleSchema,
    roleIdParamSchema
};

