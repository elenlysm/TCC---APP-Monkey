const joi = require('joi');
//Importa a biblioteca Joi para validação de dados

const settingsSchema = joi.object({
    Notifications: joi.object({
        Email: joi.boolean().required(),
        SMS: joi.boolean().required(),
        Push: joi.boolean().required()
    }).required(), //Configuração de notificações
    Privacy: joi.object({
        ProfileVisibility: joi.string().valid('Public', 'Private').required(),
        DataSharing: joi.boolean().required()
    }).required(), //Configuração de privacidade
    Security: joi.object({
        TwoFactorAuth: joi.boolean().required(),
        PasswordStrength: joi.string().valid('Low', 'Medium', 'High').required()
    }).required(), //"Força" da senha de login
}).required();

const languageSchema = joi.string().valid('pt-BR', 'en-US').required(); //Schema para validação do idioma selecionado pelo usuário
const fontsizeSchema = joi.string().valid('small', 'medium', 'large').required(); //Schema para validação do tamanho da fonte escolhido pelo usuário
const resetPasswordSchema = joi.object({ email: joi.string().email().required() }).required(); //Schema para validação de solicitação de redefinição de senha
const updateEmailSchema = joi.object({ newEmail: joi.string().email().required() }).required(); //Schema para validação da atualização de e-mail do usuário

module.exports = {
    settingsSchema,
    languageSchema,
    fontsizeSchema,
    resetPasswordSchema,
    updateEmailSchema
}; //Exporta todos os schemas para uso em outras partes da aplicação