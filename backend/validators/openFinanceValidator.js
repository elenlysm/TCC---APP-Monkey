const Joi = require('joi');
//Importa a biblioteca Joi para validação de dados

const authorizeSchema = Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required()
}); //Schema para validar os dados de autorização

const collectSchema = Joi.object({
    userId: Joi.string().required()
}); //Schema para validar os dados de uma solicitação de coleta

module.exports = { authorizeSchema, collectSchema };
//Exporta os dois schemas para uso em outras partes do sistema
