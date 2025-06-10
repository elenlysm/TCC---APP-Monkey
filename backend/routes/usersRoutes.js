const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @route   POST /users
 * @desc    Cria um novo usuário (requer autenticação)
 * @access  Privado
 */
router.post('/', authMiddleware, controller.addUser);

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
router.put('/:id', authMiddleware, controller.updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Remove um usuário específico pelo ID (requer autenticação)
 * @access  Privado
 */
router.delete('/:id', authMiddleware, controller.deleteUser);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;

