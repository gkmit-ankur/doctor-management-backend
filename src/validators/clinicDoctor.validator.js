const Joi = require('joi');

const assignDoctorSchema = Joi.object({
    clinic_id: Joi.number().integer().positive().required(),
    doctor_id: Joi.number().integer().positive().required(),
    is_active: Joi.boolean().optional()
});

const updateClinicDoctorSchema = Joi.object({
    is_active: Joi.boolean().required()
});

const clinicIdParamSchema = Joi.object({
    clinicId: Joi.number().integer().positive().required()
});

const doctorIdParamSchema = Joi.object({
    doctorId: Joi.number().integer().positive().required()
});

const clinicDoctorIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});
const paginationQuerySchema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
});

module.exports = {
    assignDoctorSchema,
    updateClinicDoctorSchema,
    clinicIdParamSchema,
    doctorIdParamSchema,
    clinicDoctorIdParamSchema,
    paginationQuerySchema
};

