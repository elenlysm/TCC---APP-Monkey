const Joi = require('joi');

const dateSchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(100)

});
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const budgetSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
    category: Joi.string().required(),
    userId: Joi.string().required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

const updateBudgetSchema = Joi.object({
    name: Joi.string(),
    value: Joi.number(),
    category: Joi.string(),
    userId: Joi.string(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
}).min(1);

const cohabitationSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.string().required(),
    priority: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().allow(''),
    members: Joi.array().items(Joi.string()),
    responsibilities: Joi.object(),

});

const updateCohabitationSchema = Joi.object({
    name: Joi.string(),
    category: Joi.string(),
    location: Joi.string(),
    status: Joi.string(),
    priority: Joi.string(),
    type: Joi.string(),
    description: Joi.string().allow(''),
    members: Joi.array().items(Joi.string()),
    responsibilities: Joi.object(),
}).min(1);

const memberSchema = Joi.object({
    memberId: Joi.string().required(),
    role: Joi.string().required()
});

const removeMemberSchema = Joi.object({
    memberId: Joi.string().required()
});

const responsibilitySchema = Joi.object({
    memberId: Joi.string().required(),
    role: Joi.string().required()
});

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    status: Joi.string().valid('active', 'inactive').required(),
    role: Joi.string().required(),
    createdAt: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    status: Joi.string().valid('active', 'inactive'),
    role: Joi.string(),
    createdAt: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
}).min(1);

const creationDateSchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

const transactionSchema = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    category: Joi.string().required(),
    status: Joi.string().optional(),
    priority: Joi.string().optional(),
    type: Joi.string().optional(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional()
});

const updateTransactionSchema = Joi.object({
    userId: Joi.string(),
    amount: Joi.number(),
    category: Joi.string(),
    status: Joi.string(),
    priority: Joi.string(),
    type: Joi.string(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
}).min(1);

const periodSchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

const createSettingSchema = Joi.object({
    key: Joi.string().required(),
    value: Joi.any().required()
});

const updateSettingsSchema = Joi.object().pattern(
    Joi.string(),
    Joi.any()
);

const monthlyReportSchema = Joi.object({
    userId: Joi.string().required(),
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(1900).required()
});

const categorySummarySchema = Joi.object({
    userId: Joi.string().required()
});

const updateProfileSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    // Adicione outros campos do perfil conforme necessário
}).min(1);

const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
});

const authorizeSchema = Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required()
});

const collectSchema = Joi.object({
    userId: Joi.string().required()
});

const sendNotificationSchema = Joi.object({
    token: Joi.string().required(),
    payload: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required()
    }).required()
});

const userIdParamSchema = Joi.object({
    userId: Joi.string().required()
});

const idParamSchema = Joi.object({
    id: Joi.string().required()
});

const statusParamSchema = Joi.object({
    status: Joi.string().required()
});

const typeParamSchema = Joi.object({
    type: Joi.string().required()
});

const priorityParamSchema = Joi.object({
    priority: Joi.string().required()
});

const channelParamSchema = Joi.object({
    channel: Joi.string().required()
});

const groupIdParamSchema = Joi.object({
    groupId: Joi.string().required()
});

const dateQuerySchema = Joi.object({
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

module.exports = {
    sendNotificationSchema,
    userIdParamSchema,
    idParamSchema,
    statusParamSchema,
    typeParamSchema,
    priorityParamSchema,
    channelParamSchema,
    groupIdParamSchema,
    dateQuerySchema, authorizeSchema, collectSchema, updateProfileSchema, updatePasswordSchema, monthlyReportSchema, categorySummarySchema, createSettingSchema, updateSettingsSchema,
    transactionSchema, updateTransactionSchema, periodSchema, userSchema, updateUserSchema, creationDateSchema, cohabitationSchema,
    updateCohabitationSchema,
    memberSchema,
    removeMemberSchema,
    responsibilitySchema, dateSchema, registerSchema, loginSchema, budgetSchema, updateBudgetSchema
};