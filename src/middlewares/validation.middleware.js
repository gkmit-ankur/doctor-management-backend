const Joi = require("joi");

const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        if (property === 'params') {
            const params = { ...req.params };
            for (const key in params) {
                const numValue = parseInt(params[key], 10);
                if (!isNaN(numValue) && params[key] === numValue.toString()) {
                    params[key] = numValue;
                }
            }
            req.params = params;
        }
        
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
            convert: true
        });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }
        req[property] = value;
        next();
    };
};

module.exports = {
    validate
};