const Joi = require('joi');

const createSlotSchema = Joi.object({
    start_time: Joi.string().required(),
    end_time: Joi.string().required()
});

const updateSlotSchema = Joi.object({
    start_time: Joi.string().optional(),
    end_time: Joi.string().optional()
});

const slotIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    createSlotSchema,
    updateSlotSchema,
    slotIdParamSchema
};

