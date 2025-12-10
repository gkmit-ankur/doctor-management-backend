const Joi = require('joi');

const assignRoleSchema = Joi.object({
    user_id: Joi.number().integer().positive().required(),
    role_id: Joi.number().integer().positive().required()
});

const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

const userRoleIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    assignRoleSchema,
    userIdParamSchema,
    userRoleIdParamSchema
};