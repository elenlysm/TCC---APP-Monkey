const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validators/authValidator');

/**
 * @route   POST /auth/register
 * @desc    Registra um novo usuário no Firebase Auth
 * @access  Público
 */
router.post('/register', validate(registerSchema, 'body'), authController.register);

/**
 * @route   POST /auth/login
 * @desc    Realiza o login de um usuário existente
 * @access  Público
 */
router.post('/login', validate(loginSchema, 'body'), authController.login);

// ...outras rotas...

module.exports = router;
