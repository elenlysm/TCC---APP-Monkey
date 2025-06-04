// controllers/budgetsController.js

const firestoreService = require('../services/firestoreService');
const COLLECTION = 'budgets';

// @desc    Adiciona um novo orçamento
// @route   POST /budgets
// @access  Privado
const addBudget = async (req, res, next) => {
    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Orçamento adicionado', id });
    } catch (error) {
        next(error);
    }
};

// @desc    Lista todos os orçamentos
// @route   GET /budgets
// @access  Privado
const getBudgets = async (req, res, next) => {
    try {
        const budgets = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Atualiza um orçamento
// @route   PUT /budgets/:id
// @access  Privado
const updateBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Orçamento atualizado' });
    } catch (error) {
        next(error);
    }
};

// @desc    Deleta um orçamento
// @route   DELETE /budgets/:id
// @access  Privado
const deleteBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Orçamento deletado' });
    } catch (error) {
        next(error);
    }
};

// @desc    Busca um orçamento específico
// @route   GET /budgets/:id
// @access  Privado
const getBudgetById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const budget = await firestoreService.getDocumentById(COLLECTION, id);
        if (!budget) {
            return res.status(404).json({ message: 'Orçamento não encontrado' });
        }
        res.status(200).json(budget);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por categoria
const getBudgetsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por usuário
const getBudgetsByUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'userId', userId);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por período
const getBudgetsByPeriod = async (req, res, next) => {
    const { startDate, endDate } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByDateRange(COLLECTION, 'date', startDate, endDate);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por status
const getBudgetsByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por prioridade
const getBudgetsByPriority = async (req, res, next) => {
    const { priority } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por tipo
const getBudgetsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por descrição
const getBudgetsByDescription = async (req, res, next) => {
    const { description } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'description', description);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por data de criação
const getBudgetsByCreationDate = async (req, res, next) => {
    const { date } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'createdAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// @desc    Lista orçamentos por data de atualização
const getBudgetsByUpdateDate = async (req, res, next) => {
    const { date } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'updatedAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

// Exporta tudo de uma vez
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
