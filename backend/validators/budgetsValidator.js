const Joi = require('joi');

// Schema para criação de um novo Budget
const budgetSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
    category: Joi.string().required(),
    userId: Joi.string().required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

// Schema para atualização parcial de um Budget
const updateBudgetSchema = Joi.object({
    name: Joi.string(),
    value: Joi.number(),
    category: Joi.string(),
    userId: Joi.string(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
}).min(1);

// Schema para parâmetros de ID
const idParamSchema = Joi.object({
    id: Joi.string().required()
});

// Schema para parâmetros de userId
const userIdParamSchema = Joi.object({
    userId: Joi.string().required()
});

// Schema para filtro por status
const statusParamSchema = Joi.object({
    status: Joi.string().required()
});

// Schema para filtro por type
const typeParamSchema = Joi.object({
    type: Joi.string().required()
});

// Schema para filtro por priority
const priorityParamSchema = Joi.object({
    priority: Joi.string().required()
});

// Schema para filtro por category
const categoryParamSchema = Joi.object({
    category: Joi.string().required()
});

// Schema para filtro por amount
const amountParamSchema = Joi.object({
    amount: Joi.number().required()
});

// Schema para filtro por tag
const tagParamSchema = Joi.object({
    tag: Joi.string().required()
});

// Schema para filtro por location
const locationParamSchema = Joi.object({
    location: Joi.string().required()
});

// Schema para filtro por currency
const currencyParamSchema = Joi.object({
    currency: Joi.string().required()
});

// Schema para filtro por paymentMethod
const paymentMethodParamSchema = Joi.object({
    paymentMethod: Joi.string().required()
});

// Schema para filtro por frequency
const frequencyParamSchema = Joi.object({
    frequency: Joi.string().required()
});

// Schema para filtro por recurrence
const recurrenceParamSchema = Joi.object({
    recurrence: Joi.string().required()
});

// Schema para filtro por paymentStatus
const paymentStatusParamSchema = Joi.object({
    paymentStatus: Joi.string().required()
});

// Schema para filtro por dueDate
const dueDateParamSchema = Joi.object({
    dueDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

// Schema para filtro por paymentDate
const paymentDateParamSchema = Joi.object({
    paymentDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

// Schema para buscas por período (startDate e endDate)
const dateSchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

module.exports = {
    budgetSchema,
    updateBudgetSchema,
    idParamSchema,
    userIdParamSchema,
    statusParamSchema,
    typeParamSchema,
    priorityParamSchema,
    categoryParamSchema,
    amountParamSchema,
    tagParamSchema,
    locationParamSchema,
    currencyParamSchema,
    paymentMethodParamSchema,
    frequencyParamSchema,
    recurrenceParamSchema,
    paymentStatusParamSchema,
    dueDateParamSchema,
    paymentDateParamSchema,
    dateSchema
};
