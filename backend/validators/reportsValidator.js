const joi = require('joi');
//Importa a biblioteca Joi, usada para validação de dados

const updateTransactionSchema = joi.object({
    transactionId: joi.string().required(),
    amount: joi.number().positive().optional(),
    type: joi.string().valid('credit', 'debit').optional(),
    description: joi.string().max(255).optional(),
    date: joi.date().iso().optional()
}); //Schema para validar a atualização de uma transação existente

const transactionIdSchema = joi.object({
    transactionId: joi.string().required()
}); //Schema para validar apenas o ID de uma transação (ex: para buscas ou exclusão)

const userIdSchema = joi.object({
    userId: joi.string().required()
}); //Schema para validar apenas o ID de um usuário (ex: para listar transações do usuário)

module.exports = {
    transactionSchema,
    updateTransactionSchema,
    transactionIdSchema,
    userIdSchema
}; //Exporta todos os schemas para uso em outras partes do sistema