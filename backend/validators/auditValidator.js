const Joi = require('joi');

const dateQuerySchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(100)
});

const userIdParamSchema = Joi.object({
    userId: Joi.string().required()
});

const actionTypeParamSchema = Joi.object({
    actionType: Joi.string().required()
});

const severityLevelParamSchema = Joi.object({
    severityLevel: Joi.string().required()
});

module.exports = {
    dateQuerySchema,
    userIdParamSchema,
    actionTypeParamSchema,
    severityLevelParamSchema
};
