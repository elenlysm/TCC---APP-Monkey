const joi = require('joi');
//Importa a biblioteca Joi para validação de dados

const settingsSchema = joi.object({
    Notifications: joi.object({
        Email: joi.boolean().required(),
        SMS: joi.boolean().required(),
        Push: joi.boolean().required()
    }).required(), //Schema para validação das configurações do usuário (Settings)

    Privacy: joi.object({
        ProfileVisibility: joi.string().valid('Public', 'Private').required(),
        DataSharing: joi.boolean().required()
    }).required(), //Schema para validação da escolha de idioma do sistema
    Security: joi.object({ 
        TwoFactorAuth: joi.boolean().required(),
        PasswordStrength: joi.string().valid('Low', 'Medium', 'High').required() }).required(), }).required(); //Schema para validação do tamanho da fonte escolhida pelo usuário

const languageSchema = joi.string().valid('pt-BR', 'en-US').required(); //Schema para validação da escolha de idioma do sistema

const fontsizeSchema = joi.string().valid('small', 'medium', 'large').required(); //Schema para validação do tamanho da fonte escolhida pelo usuário

const resetPasswordSchema = joi.object({email: joi.string().email().required()}).required(); //Schema para solicitar redefinição de senha

const updateEmailSchema = joi.object({newEmail: joi.string().email().required()}).required();  //Schema para atualizar o e-mail do usuário

module.exports = {
    settingsSchema,
    languageSchema,
    fontsizeSchema,
    resetPasswordSchema,
    updateEmailSchema
}; //Exporta todos os schemas para uso em outras partes do sistema
