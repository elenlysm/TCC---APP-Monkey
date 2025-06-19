//Esse arquivo define funções que lidam com requisições HTTP relacionadas a usuários,
//incluindo criação, listagem, atualização, exclusão e busca por filtros como status, papel (role) e data de criação.
//Essas funções são chamadas pelas rotas do sistema quando o cliente faz requisições do tipo
//POST /users, GET /users, PUT /users/:id, DELETE /users/:id, entre outras.

const firestoreService = require('../services/firestoreService');
const COLLECTION = 'users';

/**
 * @desc    Adiciona um novo usuário
 * @route   POST /users
 */
const addUser = async (req, res, next) => {
    try {
        const userData = {
            ...req.body, 
            createdAt: new Date()
        };
        const id = await firestoreService.addDocument(COLLECTION, userData);
        res.status(201).json({ message: 'Usuário adicionado com sucesso.', id });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista todos os usuários
 * @route   GET /users
 */
const getUsers = async (req, res, next) => {
    try {
        const users = await firestoreService.getDocuments(COLLECTION);
        res.status(200).json({ data: users, message: 'Usuários listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Atualiza um usuário
 * @route   PUT /users/:id
 */
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Deleta um usuário
 * @route   DELETE /users/:id
 */
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtém um usuário por ID
 * @route   GET /users/:id
 */
const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await firestoreService.getDocumentById(COLLECTION, id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtém usuários por status
 * @route   GET /users/status/:status
 */
const getUsersByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const users = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json({ data: users, message: 'Usuários listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtém usuários por papel (role)
 * @route   GET /users/role/:role
 */
const getUsersByRole = async (req, res, next) => {
    const { role } = req.params;
    try {
        const users = await firestoreService.getDocumentsByField(COLLECTION, 'role', role);
        res.status(200).json({ data: users, message: 'Usuários listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtém usuários por data de criação
 * @route   GET /users/creation?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const getUsersByCreationDate = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    try {
        const users = await firestoreService.getDocumentsByDateRange(COLLECTION, 'createdAt', startDate, endDate);
        res.status(200).json({ data: users, message: 'Usuários listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById,
    getUsersByStatus,
    getUsersByRole,
    getUsersByCreationDate
};
