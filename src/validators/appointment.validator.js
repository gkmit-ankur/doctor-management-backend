const Joi = require('joi');

const updateStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'completed').required(),
    notes: Joi.string().max(500).optional()
});

const appointmentIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const appointmentQuerySchema = Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'completed').optional(),
    doctor_id: Joi.number().integer().positive().optional(),
    clinic_id: Joi.number().integer().positive().optional(),
    patient_id: Joi.number().integer().positive().optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
});

module.exports = {
    updateStatusSchema,
    appointmentIdParamSchema,
    appointmentQuerySchema
};

