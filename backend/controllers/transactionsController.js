const firestoreService = require('../services/firestoreService');
const COLLECTION = 'transactions';

/**
 * Adiciona uma nova transação.
 * @route POST /transactions
 */
const addTransaction = async (req, res, next) => {
    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Transação adicionada com sucesso.', id });
    } catch (error) {
        next(error);
    }
};

/**
 * Lista todas as transações.
 * @route GET /transactions
 */
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json({ data: transactions, message: 'Transações listadas com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * Atualiza uma transação.
 * @route PUT /transactions/:id
 */
const updateTransaction = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Transação atualizada com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * Deleta uma transação.
 * @route DELETE /transactions/:id
 */
const deleteTransaction = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Transação deletada com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * Busca uma transação específica.
 * @route GET /transactions/:id
 */
const getTransactionById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const transaction = await firestoreService.getDocumentById(COLLECTION, id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista transações por categoria.
 * @route GET /transactions/category/:category
 */
const getTransactionsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista transações por usuário.
 * @route GET /transactions/user/:userId
 */
const getTransactionsByUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'userId', userId);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista transações por período.
 * @route GET /transactions/period?startDate=&endDate=
 */
const getTransactionsByPeriod = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    try {
        const transactions = await firestoreService.getDocumentsByDateRange(COLLECTION, 'date', startDate, endDate);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista transações por status.
 * @route GET /transactions/status/:status
 */
const getTransactionsByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista transações por prioridade.
 * @route GET /transactions/priority/:priority
 */
const getTransactionsByPriority = async (req, res, next) => {
    const { priority } = req.params;
    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista transações por tipo.
 * @route GET /transactions/type/:type
 */
const getTransactionsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactionsByCategory,
    getTransactionsByUser,
    getTransactionsByPeriod,
    getTransactionsByStatus,
    getTransactionsByPriority,
    getTransactionsByType
};
