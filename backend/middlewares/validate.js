
module.exports = (schema, property = 'body') => (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'validation_error',
            error: error.details.map((detail) => detail.message,)
        });
    }
    req[property] = value;
    next();
};
