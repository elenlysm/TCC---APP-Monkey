const Joi = require('joi');
//Importa a biblioteca Joi, usada para validação de dados

const dateQuerySchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(100)
});  //Define um schema para validar parâmetros de consulta relacionados a datas

const userIdParamSchema = Joi.object({
    userId: Joi.string().required()
}); //Define um schema para validar o parâmetro de rota "userId"

const actionTypeParamSchema = Joi.object({
    actionType: Joi.string().required()
}); //Define um schema para validar o parâmetro de rota "actionType"

const severityLevelParamSchema = Joi.object({
    severityLevel: Joi.string().required()
}); //Define um schema para validar o parâmetro de rota "severityLevel"

module.exports = {
    dateQuerySchema,
    userIdParamSchema,
    actionTypeParamSchema,
    severityLevelParamSchema
}; //Exporta os schemas para serem utilizados em outras partes do projeto
