const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    Password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
        .required()
        .messages({
            'string.pattern.base': 'A senha deve ter no mínimo uma letra maiúscula, uma minúscula, um número e um caractere especial.'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('Password'))
        .required()
        .messages({
            'any.only': 'A confirmação de senha não corresponde à senha informada.'
        })
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});
const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().valid(Joi.ref('Password')).required(),
    newPassword: Joi.string().min(6).required()
});

module.exports = {
    registerSchema,
    loginSchema,
    resetPasswordSchema,
    updatePasswordSchema
};