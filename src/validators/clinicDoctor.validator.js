const Joi = require('joi');

const assignDoctorSchema = Joi.object({
    clinic_id: Joi.number().integer().positive().required(),
    doctor_id: Joi.number().integer().positive().required(),
    is_active: Joi.boolean().optional()
});

const updateClinicDoctorSchema = Joi.object({
    is_active: Joi.boolean().optional()
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

module.exports = {
    assignDoctorSchema,
    updateClinicDoctorSchema,
    clinicIdParamSchema,
    doctorIdParamSchema,
    clinicDoctorIdParamSchema
};

