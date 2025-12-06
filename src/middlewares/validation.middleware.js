const Joi = require("joi");
const validate = (schema) => {
    return (req, res, next) => {
        console.log("Validating request body:", req.body);
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: false
        });
        console.log("Validation result:", error);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};
module.exports = {
    validate
};