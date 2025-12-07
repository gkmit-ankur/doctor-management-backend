const Joi = require('joi');

const createSlotSchema = Joi.object({
    clinic_doctor_id: Joi.number().integer().positive().required(),
    doctor_id: Joi.number().integer().positive().required(),
    slot_time: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).required()
});

const updateSlotSchema = Joi.object({
    slot_time: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional()
});

const clinicDoctorIdParamSchema = Joi.object({
    clinicDoctorId: Joi.number().integer().positive().required()
});

const doctorIdParamSchema = Joi.object({
    doctorId: Joi.number().integer().positive().required()
});

const slotIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    createSlotSchema,
    updateSlotSchema,
    clinicDoctorIdParamSchema,
    doctorIdParamSchema,
    slotIdParamSchema
};

