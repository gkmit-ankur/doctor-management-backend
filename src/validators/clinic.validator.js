const Joi = require('joi');

const createClinicSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    address: Joi.string().min(1).max(255).required(),
    contact: Joi.string().min(10).max(20).required(),
    nha_id: Joi.string().min(1).max(50).required(),
    is_active: Joi.boolean().optional()
});

const updateClinicSchema = Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    address: Joi.string().min(1).max(255).optional(),
    contact: Joi.string().min(10).max(20).optional(),
    nha_id: Joi.string().min(1).max(50).optional(),
    is_active: Joi.boolean().optional()
});

const clinicIdParamSchema = Joi.object({
    clinicId: Joi.number().integer().positive().required()
});

const clinicQuerySchema = Joi.object({
    is_active: Joi.boolean().optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
});

module.exports = {
    createClinicSchema,
    updateClinicSchema,
    clinicIdParamSchema,
    clinicQuerySchema
};