const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    // senha opcional no user (não obrigatória aqui pois é validada no authValidator)
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid('user', 'admin').optional(), // exemplo de perfil
    createdAt: Joi.date().optional(),
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid('user', 'admin').optional(),
});

const creationDateSchema = Joi.object({
    from: Joi.date().iso().optional(),
    to: Joi.date().iso().optional(),
});

module.exports = {
    userSchema,
    updateUserSchema,
    creationDateSchema,
};
