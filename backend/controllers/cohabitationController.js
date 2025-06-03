const firestoreService = require('../services/firestoreService');
const COLLECTION = 'cohabitation';

const addCohabitation = async (req, res) => {
    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Coabitação adicionada', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCohabitations = async (req, res) => {
    try {
        const cohabitations = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json(cohabitations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCohabitation = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Coabitação atualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCohabitation = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Coabitação deletada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addCohabitation, getCohabitations, updateCohabitation, deleteCohabitation };
