// controllers/budgetsController.js

const firestoreService = require('../services/firestoreService');
const COLLECTION = 'budgets';

// Função utilitária para validação de datas no formato YYYY-MM-DD
const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

/**
 * @desc    Adiciona um novo orçamento
 * @route   POST /budgets
 * @access  Privado
 */
const addBudget = async (req, res, next) => {
    try {
        const { name, value, category, userId, date } = req.body;
        // Validação básica dos campos obrigatórios
        if (!name || !value || !category || !userId || !date) {
            return res.status(400).json({ error: 'Campos obrigatórios: name, value, category, userId, date.' });
        }
        // Validação de formato de data
        if (!isValidDate(date)) {
            return res.status(400).json({ error: 'O campo date deve estar no formato YYYY-MM-DD.' });
        }
        // (Opcional) Validação de tipos pode ser adicionada aqui

        // Adiciona o orçamento no Firestore
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Orçamento adicionado com sucesso.', id });
    } catch (error) {
        console.error('Erro ao adicionar orçamento:', error);
        next(error);
    }
};

/**
 * @desc    Lista todos os orçamentos com paginação
 * @route   GET /budgets?page=1&limit=20
 * @access  Privado
 */
const getBudgets = async (req, res, next) => {
    try {
        // Paginação: page e limit via query string
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const budgets = await firestoreService.getBudgets({ page, limit });
        res.status(200).json({ data: budgets, message: 'Orçamentos listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao listar orçamentos:', error);
        next(error);
    }
};

/**
 * @desc    Atualiza um orçamento
 * @route   PUT /budgets/:id
 * @access  Privado
 */
const updateBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Validação: não permitir update vazio
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Dados para atualização não fornecidos.' });
        }
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Orçamento atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar orçamento:', error);
        next(error);
    }
};

/**
 * @desc    Deleta um orçamento
 * @route   DELETE /budgets/:id
 * @access  Privado
 */
const deleteBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Orçamento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar orçamento:', error);
        next(error);
    }
};

/**
 * @desc    Busca um orçamento específico por ID
 * @route   GET /budgets/:id
 * @access  Privado
 */
const getBudgetById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const budget = await firestoreService.getDocumentById(COLLECTION, id);
        if (!budget) {
            return res.status(404).json({ message: 'Orçamento não encontrado.' });
        }
        res.status(200).json(budget);
    } catch (error) {
        console.error('Erro ao buscar orçamento por ID:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por categoria
 * @route   GET /budgets/category/:category
 */
const getBudgetsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por categoria:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por usuário
 * @route   GET /budgets/user/:userId
 */
const getBudgetsByUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'userId', userId);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por usuário:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por período (intervalo de datas)
 * @route   GET /budgets/period/:startDate/:endDate
 */
const getBudgetsByPeriod = async (req, res, next) => {
    const { startDate, endDate } = req.params;
    // Validação de datas
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'As datas devem estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByDateRange(COLLECTION, 'date', startDate, endDate);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por período:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por status
 * @route   GET /budgets/status/:status
 */
const getBudgetsByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por status:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por prioridade
 * @route   GET /budgets/priority/:priority
 */
const getBudgetsByPriority = async (req, res, next) => {
    const { priority } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por prioridade:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por tipo
 * @route   GET /budgets/type/:type
 */
const getBudgetsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por tipo:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por descrição
 * @route   GET /budgets/description/:description
 */
const getBudgetsByDescription = async (req, res, next) => {
    const { description } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'description', description);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por descrição:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por data de criação
 * @route   GET /budgets/createdAt/:date
 */
const getBudgetsByCreationDate = async (req, res, next) => {
    const { date } = req.params;
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'createdAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de criação:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por data de atualização
 * @route   GET /budgets/updatedAt/:date
 */
const getBudgetsByUpdateDate = async (req, res, next) => {
    const { date } = req.params;
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'updatedAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de atualização:', error);
        next(error);
    }
};

// Exporta todas as funções do controller para uso nas rotas
module.exports = {
    addBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetById,
    getBudgetsByCategory,
    getBudgetsByUser,
    getBudgetsByPeriod,
    getBudgetsByStatus,
    getBudgetsByPriority,
    getBudgetsByType,
    getBudgetsByDescription,
    getBudgetsByCreationDate,
    getBudgetsByUpdateDate
};
