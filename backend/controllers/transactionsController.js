const firestoreService = require('../services/firestoreService');
const COLLECTION = 'transactions';

/**
 * Adiciona uma nova transação.
 * @route POST /transactions
 */
const addTransaction = async (req, res) => {
    const { userId, amount, category } = req.body;

    if (!userId || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Campos obrigatórios: userId e amount (número).' });
    }

    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Transação adicionada com sucesso.', id });
    } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        res.status(500).json({ error: 'Falha ao adicionar transação.' });
    }
};

/**
 * Lista todas as transações.
 * @route GET /transactions
 */
const getTransactions = async (req, res) => {
    try {
        const transactions = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({ error: 'Falha ao obter transações.' });
    }
};

/**
 * Atualiza uma transação.
 * @route PUT /transactions/:id
 */
const updateTransaction = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da transação é obrigatório.' });
    }

    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Transação atualizada com sucesso.' });
    } catch (error) {
        console.error(`Erro ao atualizar transação ${id}:`, error);
        res.status(500).json({ error: 'Falha ao atualizar transação.' });
    }
};

/**
 * Deleta uma transação.
 * @route DELETE /transactions/:id
 */
const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da transação é obrigatório.' });
    }

    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Transação deletada com sucesso.' });
    } catch (error) {
        console.error(`Erro ao deletar transação ${id}:`, error);
        res.status(500).json({ error: 'Falha ao deletar transação.' });
    }
};

/**
 * Busca uma transação específica.
 * @route GET /transactions/:id
 */
const getTransactionById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da transação é obrigatório.' });
    }

    try {
        const transaction = await firestoreService.getDocumentById(COLLECTION, id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error(`Erro ao obter transação ${id}:`, error);
        res.status(500).json({ error: 'Falha ao obter transação.' });
    }
};

/**
 * Lista transações por categoria.
 * @route GET /transactions/category/:category
 */
const getTransactionsByCategory = async (req, res) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ error: 'Categoria é obrigatória.' });
    }

    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Erro ao obter transações da categoria ${category}:`, error);
        res.status(500).json({ error: 'Falha ao obter transações por categoria.' });
    }
};

/**
 * Lista transações por usuário.
 * @route GET /transactions/user/:userId
 */
const getTransactionsByUser = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'userId é obrigatório.' });
    }

    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'userId', userId);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Erro ao obter transações do usuário ${userId}:`, error);
        res.status(500).json({ error: 'Falha ao obter transações por usuário.' });
    }
};

/**
 * Lista transações por período.
 * @route GET /transactions/period?startDate=&endDate=
 */
const getTransactionsByPeriod = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }

    try {
        const transactions = await firestoreService.getDocumentsByDateRange(COLLECTION, 'date', startDate, endDate);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Erro ao obter transações no período ${startDate} a ${endDate}:`, error);
        res.status(500).json({ error: 'Falha ao obter transações por período.' });
    }
};

/**
 * Lista transações por status.
 * @route GET /transactions/status/:status
 */
const getTransactionsByStatus = async (req, res) => {
    const { status } = req.params;

    if (!status) {
        return res.status(400).json({ error: 'Status é obrigatório.' });
    }

    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Erro ao obter transações com status ${status}:`, error);
        res.status(500).json({ error: 'Falha ao obter transações por status.' });
    }
};

/**
 * Lista transações por prioridade.
 * @route GET /transactions/priority/:priority
 */
const getTransactionsByPriority = async (req, res) => {
    const { priority } = req.params;

    if (!priority) {
        return res.status(400).json({ error: 'Prioridade é obrigatória.' });
    }

    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Erro ao obter transações com prioridade ${priority}:`, error);
        res.status(500).json({ error: 'Falha ao obter transações por prioridade.' });
    }
};

/**
 * Lista transações por tipo.
 * @route GET /transactions/type/:type
 */
const getTransactionsByType = async (req, res) => {
    const { type } = req.params;

    if (!type) {
        return res.status(400).json({ error: 'Tipo é obrigatório.' });
    }

    try {
        const transactions = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Erro ao obter transações do tipo ${type}:`, error);
        res.status(500).json({ error: 'Falha ao obter transações por tipo.' });
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
