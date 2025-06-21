const joi = require('joi');
//Importa a biblioteca Joi, usada para validação de dados de entrada

const updateTransactionSchema = joi.object({
    transactionId: joi.string().required(),
    amount: joi.number().positive().optional(),
    type: joi.string().valid('credit', 'debit').optional(),
    description: joi.string().max(255).optional(),
    date: joi.date().iso().optional()
}); //Schema para validação de atualização de uma transação existente

const transactionIdSchema = joi.object({
    transactionId: joi.string().required()
}); //Schema para validação de um objeto que contenha apenas o ID da transação

const userIdSchema = joi.object({
    userId: joi.string().required()
}); //Schema para validação de um objeto que contenha apenas o ID do usuário

module.exports = {
    transactionSchema,
    updateTransactionSchema,
    transactionIdSchema,
    userIdSchema
}; //Exporta os schemas para uso em outras partes do sistema (ex: rotas, middlewares)