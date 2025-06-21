const Joi = require('joi');
//Importa a biblioteca Joi, usada para validação de dados

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
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
}); //Schema de validação para o registro de um novo usuário
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required()
}); //Schema de validação para login

const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().valid(Joi.ref('Password')).required(),
    newPassword: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
        .required()
        .messages({
            'string.pattern.base': 'A senha deve ter no mínimo uma letra maiúscula, uma minúscula, um número e um caractere especial.'
        }),
    confirmNewPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': 'A confirmação de senha não corresponde à senha informada.'
        })
}); //Schema de validação para solicitação de redefinição de senha (esqueci minha senha)

module.exports = {
    registerSchema,
    loginSchema,
    resetPasswordSchema,
    updatePasswordSchema
}; //Exporta os schemas para serem utilizados em outras partes da aplicação