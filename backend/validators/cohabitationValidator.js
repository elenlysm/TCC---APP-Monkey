const joi = require('joi');
const transactionSchema = joi.object({
    userId: joi.string().required(),
    amount: joi.number().positive().required(),
    type: joi.string().valid('credit', 'debit').required(),
    description: joi.string().max(255).optional(),
    date: joi.date().iso().required()
});
const updateTransactionSchema = joi.object({
    transactionId: joi.string().required(),
    amount: joi.number().positive().optional(),
    type: joi.string().valid('credit', 'debit').optional(),
    description: joi.string().max(255).optional(),
    date: joi.date().iso().optional()
});
const transactionIdSchema = joi.object({
    transactionId: joi.string().required()
});
const userIdSchema = joi.object({
    userId: joi.string().required()
});
module.exports = {
    transactionSchema,
    updateTransactionSchema,
    transactionIdSchema,
    userIdSchema
};
// This code defines validation schemas for transaction-related operations using Joi.
