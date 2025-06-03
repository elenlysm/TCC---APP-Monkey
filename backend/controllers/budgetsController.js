const firestoreService = require('../services/firestoreService');
const COLLECTION = 'budgets';

const addBudget = async (req, res) => {
    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Orçamento adicionado', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBudgets = async (req, res) => {
    try {
        const budgets = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addBudget, getBudgets };
const updateBudget = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Orçamento atualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
