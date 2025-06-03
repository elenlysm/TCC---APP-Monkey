const Joi = require('joi');

const authorizeSchema = Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required()
});

const collectSchema = Joi.object({
    userId: Joi.string().required()
});

module.exports = { authorizeSchema, collectSchema };
