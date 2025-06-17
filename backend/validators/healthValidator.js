const joi = require('joi');
const settingsSchema = joi.object({
    Notifications: joi.object({
        Email: joi.boolean().required(),
        SMS: joi.boolean().required(),
        Push: joi.boolean().required()
    }).required(),
    Privacy: joi.object({
        ProfileVisibility: joi.string().valid('Public', 'Private').required(),
        DataSharing: joi.boolean().required()
    }).required(),
    Security: joi.object({
        TwoFactorAuth: joi.boolean().required(),
        PasswordStrength: joi.string().valid('Low', 'Medium', 'High').required()
    }).required(),
}).required();
const languageSchema = joi.string().valid('pt-BR', 'en-US').required();
const fontsizeSchema = joi.string().valid('small', 'medium', 'large').required();
const resetPasswordSchema = joi.object({
    email: joi.string().email().required()
}).required();
const updateEmailSchema = joi.object({
    newEmail: joi.string().email().required()
}).required();
module.exports = {
    settingsSchema,
    languageSchema,
    fontsizeSchema,
    resetPasswordSchema,
    updateEmailSchema
};