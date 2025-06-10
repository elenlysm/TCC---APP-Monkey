const express = require('express');
const { body, query, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/budgetsController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Middleware reutilizável para validação de campos e resposta padronizada de erro.
 * Executa todas as validações passadas, e se houver erro, retorna o primeiro erro encontrado.
 */
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Padroniza o erro para { error: 'mensagem' }
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    };
};

//  Adicionar orçamento
// Cria um novo orçamento. Requer autenticação e validação dos campos obrigatórios.
router.post(
    '/',
    authMiddleware,
    validate([
        body('amount').isNumeric().withMessage('O valor é obrigatório e deve ser numérico.'),
        body('category').notEmpty().withMessage('A categoria é obrigatória.'),
        body('description').optional().isString().withMessage('Descrição deve ser uma string.'),
        body('date').optional().isISO8601().withMessage('Data deve estar no formato ISO8601.')
    ]),
    controller.addBudget
);

//  Listar orçamentos
// Lista todos os orçamentos do usuário autenticado.
router.get('/', authMiddleware, controller.getBudgets);

//  Atualizar orçamento
// Atualiza um orçamento existente pelo ID.
router.put(
    '/:id',
    authMiddleware,
    validate([
        body('amount').optional().isNumeric().withMessage('O valor deve ser numérico.'),
        body('category').optional().notEmpty().withMessage('A categoria não pode estar vazia.'),
        body('description').optional().isString().withMessage('Descrição deve ser uma string.'),
        body('date').optional().isISO8601().withMessage('Data deve estar no formato ISO8601.')
    ]),
    controller.updateBudget
);

//  Deletar orçamento
// Remove um orçamento pelo ID.
router.delete('/:id', authMiddleware, controller.deleteBudget);

//  Obter orçamento por ID
// Retorna um orçamento específico pelo ID.
router.get('/:id', authMiddleware, controller.getBudgetById);

//  Obter orçamentos por categoria
router.get('/category/:category', authMiddleware, controller.getBudgetsByCategory);

//  Obter orçamentos por data (usa query params para intervalo de datas)
router.get(
    '/date',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByDate
);

//  Obter orçamentos por status
router.get('/status/:status', authMiddleware, controller.getBudgetsByStatus);

//  Obter orçamentos por usuário
router.get('/user/:userId', authMiddleware, controller.getBudgetsByUser);

//  Obter orçamentos por valor (usa query params para min/max)
router.get(
    '/amount',
    authMiddleware,
    validate([
        query('minAmount').optional().isNumeric().withMessage('Valor mínimo deve ser numérico.'),
        query('maxAmount').optional().isNumeric().withMessage('Valor máximo deve ser numérico.')
    ]),
    controller.getBudgetsByAmount
);

//  Obter orçamentos por descrição (usa query param)
router.get(
    '/description',
    authMiddleware,
    validate([
        query('description').optional().isString().withMessage('Descrição deve ser uma string.')
    ]),
    controller.getBudgetsByDescription
);

//  Obter orçamentos por data de criação (usa query params)
router.get(
    '/created-at',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByCreatedAt
);

//  Obter orçamentos por data de atualização (usa query params)
router.get(
    '/updated-at',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByUpdatedAt
);

//  Obter orçamentos por tipo
router.get('/type/:type', authMiddleware, controller.getBudgetsByType);

//  Obter orçamentos por prioridade
router.get('/priority/:priority', authMiddleware, controller.getBudgetsByPriority);

//  Obter orçamentos por tags
router.get('/tags/:tag', authMiddleware, controller.getBudgetsByTag);

//  Obter orçamentos por localização (usa query params)
router.get(
    '/location',
    authMiddleware,
    validate([
        query('latitude').optional().isNumeric().withMessage('Latitude deve ser numérica.'),
        query('longitude').optional().isNumeric().withMessage('Longitude deve ser numérica.')
    ]),
    controller.getBudgetsByLocation
);

//  Obter orçamentos por moeda
router.get('/currency/:currency', authMiddleware, controller.getBudgetsByCurrency);

//  Obter orçamentos por método de pagamento
router.get('/payment-method/:method', authMiddleware, controller.getBudgetsByPaymentMethod);

//  Obter orçamentos por frequência
router.get('/frequency/:frequency', authMiddleware, controller.getBudgetsByFrequency);

//  Obter orçamentos por recorrência
router.get('/recurrence/:recurrence', authMiddleware, controller.getBudgetsByRecurrence);

//  Obter orçamentos por status de pagamento
router.get('/payment-status/:status', authMiddleware, controller.getBudgetsByPaymentStatus);

//  Obter orçamentos por data de vencimento (usa query params)
router.get(
    '/due-date',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByDueDate
);

//  Obter orçamentos por data de pagamento (usa query params)
router.get(
    '/payment-date',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByPaymentDate
);

//  Obter orçamentos por data de criação do usuário (usa query params)
router.get(
    '/user-created-at',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByUserCreatedAt
);

//  Obter orçamentos por data de atualização do usuário (usa query params)
router.get(
    '/user-updated-at',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByUserUpdatedAt
);

//  Obter orçamentos por data de criação do orçamento (usa query params)
router.get(
    '/budget-created-at',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByBudgetCreatedAt
);

//  Obter orçamentos por data de atualização do orçamento (usa query params)
router.get(
    '/budget-updated-at',
    authMiddleware,
    validate([
        query('startDate').optional().isISO8601().withMessage('Data de início deve estar no formato ISO8601.'),
        query('endDate').optional().isISO8601().withMessage('Data de fim deve estar no formato ISO8601.')
    ]),
    controller.getBudgetsByBudgetUpdatedAt
);

module.exports = router;

