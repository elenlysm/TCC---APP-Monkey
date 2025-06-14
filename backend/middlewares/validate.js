
module.exports = (schema, property = 'query') => (req, res, next) => {
    const { error, value } = schema.validate(req[property]);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req[property] = value;
    next();
};
