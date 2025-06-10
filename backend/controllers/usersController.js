const firestoreService = require('../services/firestoreService');
const COLLECTION = 'users';

/**
 * @desc    Adiciona um novo usuário
 * @route   POST /users
 */
const addUser = async (req, res) => { /* ... */ };

/**
 * @desc    Lista todos os usuários
 * @route   GET /users
 */
const getUsers = async (req, res) => { /* ... */ };

/**
 * @desc    Atualiza um usuário
 * @route   PUT /users/:id
 */
const updateUser = async (req, res) => { /* ... */ };

/**
 * @desc    Deleta um usuário
 * @route   DELETE /users/:id
 */
const deleteUser = async (req, res) => { /* ... */ };

/**
 * @desc    Obtém um usuário por ID
 * @route   GET /users/:id
 */
const getUserById = async (req, res) => { /* ... */ };

/**
 * @desc    Obtém usuários por status
 * @route   GET /users/status/:status
 */
const getUsersByStatus = async (req, res) => { /* ... */ };

/**
 * @desc    Obtém usuários por papel (role)
 * @route   GET /users/role/:role
 */
const getUsersByRole = async (req, res) => { /* ... */ };

/**
 * @desc    Obtém usuários por data de criação
 * @route   GET /users/creation?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const getUsersByCreationDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }

    try {
        const users = await firestoreService.getDocumentsByDateRange(COLLECTION, 'createdAt', startDate, endDate);
        res.status(200).json({ data: users, message: 'Usuários listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter usuários por data de criação:', error);
        res.status(500).json({ error: 'Falha ao obter usuários por data de criação.' });
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
