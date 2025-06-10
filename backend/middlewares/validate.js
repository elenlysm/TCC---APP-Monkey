// Middleware para validação de requisições usando um schema (ex: Joi)
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        // Retorna erro 400 com a primeira mensagem de validação encontrada
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validate;
