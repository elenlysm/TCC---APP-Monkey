const firestoreService = require('../services/firestoreService');
const COLLECTION = 'transactions';

const addTransaction = async (req, res) => {
    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Transação adicionada', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Transação atualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Transação deletada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addTransaction, getTransactions, updateTransaction, deleteTransaction };
