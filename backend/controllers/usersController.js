const firestoreService = require('../services/firestoreService');
const COLLECTION = 'users';

const addUser = async (req, res) => {
    try {
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Usuário adicionado', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Usuário atualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addUser, getUsers, updateUser, deleteUser };

