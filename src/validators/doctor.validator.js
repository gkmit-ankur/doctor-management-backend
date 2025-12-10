const Joi = require('joi');

const createDoctorSchema = Joi.object({
    doctor_id: Joi.number().integer().positive().required(),
    nha_id: Joi.string().min(1).max(50).required(),
    specialization: Joi.string().min(1).max(100).optional(),
    qualification: Joi.string().min(1).max(200).optional(),
    experience: Joi.number().integer().min(0).optional(),
    contact: Joi.string().min(10).max(20).optional(),
    bio: Joi.string().max(1000).optional(),
    consultation_fee: Joi.number().positive().precision(2).optional()
});

const updateDoctorSchema = Joi.object({
    doctor_id: Joi.number().integer().positive().optional(),
    nha_id: Joi.string().min(1).max(50).optional(),
    specialization: Joi.string().min(1).max(100).optional(),
    qualification: Joi.string().min(1).max(200).optional(),
    experience: Joi.number().integer().min(0).optional(),
    contact: Joi.string().min(10).max(20).optional(),
    bio: Joi.string().max(1000).optional(),
    consultation_fee: Joi.number().positive().precision(2).optional()
});

const doctorIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

const clinicIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    clinicId: Joi.number().integer().positive().required()
});

const doctorQuerySchema = Joi.object({
    specialization: Joi.string().max(100).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
});

const appointmentQuerySchema = Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'completed').optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
});

module.exports = {
    createDoctorSchema,
    updateDoctorSchema,
    doctorIdParamSchema,
    userIdParamSchema,
    clinicIdParamSchema,
    doctorQuerySchema,
    appointmentQuerySchema
};