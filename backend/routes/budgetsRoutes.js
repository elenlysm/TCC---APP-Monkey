const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/budgetsController');
const authMiddleware = require('../middlewares/authMiddleware');

// ✅ Adicionar orçamento
router.post(
    '/',
    authMiddleware,
    [
        body('amount').isNumeric().withMessage('O valor é obrigatório e deve ser numérico.'),
        body('category').notEmpty().withMessage('A categoria é obrigatória.'),
        body('description').optional().isString().withMessage('Descrição deve ser uma string.'),
        body('date').optional().isISO8601().withMessage('Data deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.addBudget
);

// ✅ Listar orçamentos
router.get('/', authMiddleware, controller.getBudgets);

module.exports = router;
// ✅ Atualizar orçamento
router.put(
    '/:id',
    authMiddleware,
    [
        body('amount').optional().isNumeric().withMessage('O valor deve ser numérico.'),
        body('category').optional().notEmpty().withMessage('A categoria não pode estar vazia.'),
        body('description').optional().isString().withMessage('Descrição deve ser uma string.'),
        body('date').optional().isISO8601().withMessage('Data deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.updateBudget
);
// ✅ Deletar orçamento
router.delete(
    '/:id',
    authMiddleware,
    controller.deleteBudget
);
// ✅ Obter orçamento por ID
router.get(
    '/:id',
    authMiddleware,
    controller.getBudgetById
);
// ✅ Obter orçamentos por categoria
router.get(
    '/category/:category',
    authMiddleware,
    controller.getBudgetsByCategory
);
// ✅ Obter orçamentos por data
router.get(
    '/date',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByDate
);
// ✅ Obter orçamentos por status
router.get(
    '/status/:status',
    authMiddleware,
    controller.getBudgetsByStatus
);
// ✅ Obter orçamentos por usuário
router.get(
    '/user/:userId',
    authMiddleware,
    controller.getBudgetsByUser
);
// ✅ Obter orçamentos por valor
router.get(
    '/amount',
    authMiddleware,
    [
        body('minAmount').optional().isNumeric().withMessage('Valor mínimo deve ser numérico.'),
        body('maxAmount').optional().isNumeric().withMessage('Valor máximo deve ser numérico.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByAmount
);
// ✅ Obter orçamentos por descrição
router.get(
    '/description',
    authMiddleware,
    [
        body('description').optional().isString().withMessage('Descrição deve ser uma string.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByDescription
);
// ✅ Obter orçamentos por data de criação
router.get(
    '/created-at',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByCreatedAt
);
// ✅ Obter orçamentos por data de atualização
router.get(
    '/updated-at',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByUpdatedAt
);
// ✅ Obter orçamentos por tipo
router.get(
    '/type/:type',
    authMiddleware,
    controller.getBudgetsByType
);
// ✅ Obter orçamentos por prioridade
router.get(
    '/priority/:priority',
    authMiddleware,
    controller.getBudgetsByPriority
);
// ✅ Obter orçamentos por tags
router.get(
    '/tags/:tag',
    authMiddleware,
    controller.getBudgetsByTag
);
// ✅ Obter orçamentos por localização
router.get(
    '/location',
    authMiddleware,
    [
        body('latitude').optional().isNumeric().withMessage('Latitude deve ser numérica.'),
        body('longitude').optional().isNumeric().withMessage('Longitude deve ser numérica.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByLocation
);
// ✅ Obter orçamentos por moeda
router.get(
    '/currency/:currency',
    authMiddleware,
    controller.getBudgetsByCurrency
);
// ✅ Obter orçamentos por método de pagamento
router.get(
    '/payment-method/:method',
    authMiddleware,
    controller.getBudgetsByPaymentMethod
);
// ✅ Obter orçamentos por frequência
router.get(
    '/frequency/:frequency',
    authMiddleware,
    controller.getBudgetsByFrequency
);
// ✅ Obter orçamentos por recorrência
router.get(
    '/recurrence/:recurrence',
    authMiddleware,
    controller.getBudgetsByRecurrence
);
// ✅ Obter orçamentos por status de pagamento
router.get(
    '/payment-status/:status',
    authMiddleware,
    controller.getBudgetsByPaymentStatus
);
// ✅ Obter orçamentos por data de vencimento
router.get(
    '/due-date',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByDueDate
);
// ✅ Obter orçamentos por data de pagamento
router.get(
    '/payment-date',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByPaymentDate
);
// ✅ Obter orçamentos por data de criação do usuário
router.get(
    '/user-created-at',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByUserCreatedAt
);
// ✅ Obter orçamentos por data de atualização do usuário
router.get(
    '/user-updated-at',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByUserUpdatedAt
);
// ✅ Obter orçamentos por data de criação do orçamento
router.get(
    '/budget-created-at',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByBudgetCreatedAt
);
// ✅ Obter orçamentos por data de atualização do orçamento
router.get(
    '/budget-updated-at',
    authMiddleware,
    [
        body('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        body('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    controller.getBudgetsByBudgetUpdatedAt
);

