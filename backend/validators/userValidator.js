const Joi = require('joi');
//Importa a biblioteca Joi para validação de dados

const userSchema = Joi.object({
    uid: Joi.string().optional(),
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid('user', 'admin').optional(), // exemplo de perfil
    createdAt: Joi.date().optional(),
}); //Schema para validar os dados de criação de um novo usuário

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid('user', 'admin').optional(),
}); //Schema para validar atualização de dados do usuário

const creationDateSchema = Joi.object({
    from: Joi.date().iso().optional(),
    to: Joi.date().iso().optional(),
}); //Schema para filtrar usuários por data de criação

module.exports = {
    userSchema,
    updateUserSchema,
    creationDateSchema,
}; //Exporta os schemas para serem usados em outras partes da aplicação
