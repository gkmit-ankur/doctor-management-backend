const Joi = require('joi');


const createPatientProfileSchema = Joi.object({
    date_of_birth: Joi.date().max('now').optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    contact: Joi.string().min(10).max(20).optional(),
    blood_group: Joi.string().max(10).optional(),
    emergency_contact: Joi.string().min(10).max(20).optional()
});

const updatePatientProfileSchema = Joi.object({
    date_of_birth: Joi.date().max('now').optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    contact: Joi.string().min(10).max(20).optional(),
    blood_group: Joi.string().max(10).optional(),
    emergency_contact: Joi.string().min(10).max(20).optional()
});


const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

const patientIdParamSchema = Joi.object({
    patientId: Joi.number().integer().positive().required()
});

const appointmentIdParamSchema = Joi.object({
    patientId: Joi.number().integer().positive().required(),
    appointmentId: Joi.number().integer().positive().required()
});


const bookAppointmentSchema = Joi.object({
    doctor_id: Joi.number().integer().positive().required(),
    clinic_id: Joi.number().integer().positive().required(),
    slot_id: Joi.number().integer().positive().required(),
    notes: Joi.string().max(500).optional()
});


const appointmentQuerySchema = Joi.object({
    status: Joi.string().valid('scheduled', 'confirmed', 'cancelled', 'deferred').optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
});


module.exports = {
    createPatientProfileSchema,
    updatePatientProfileSchema,
    userIdParamSchema,
    patientIdParamSchema,
    appointmentIdParamSchema,
    bookAppointmentSchema,
    appointmentQuerySchema,
};