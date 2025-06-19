const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const { userSchema, updateUserSchema, creationDateSchema } = require('../validators/userValidator');

/**
 * @route   POST /users
 * @desc    Cria um novo usuário (requer autenticação)
 * @access  Privado
 */
router.post('/', authMiddleware, validate(userSchema, 'body'), controller.addUser);

/**
 * @route   GET /users
 * @desc    Lista todos os usuários (requer autenticação)
 * @access  Privado
 */
router.get('/', authMiddleware, controller.getUsers);

/**
 * @route   PUT /users/:id
 * @desc    Atualiza um usuário específico pelo ID (requer autenticação)
 * @access  Privado
 */
router.put('/:id', authMiddleware, validate(updateUserSchema, 'body'), controller.updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Remove um usuário específico pelo ID (requer autenticação)
 * @access  Privado
 */
router.delete('/:id', authMiddleware, controller.deleteUser);

/**
 * @route   GET /users/creation
 * @desc    Busca usuários por data de criação (requer autenticação)
 * @access  Privado
 */
router.get('/creation', authMiddleware, validate(creationDateSchema, 'query'), controller.getUsersByCreationDate);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;

