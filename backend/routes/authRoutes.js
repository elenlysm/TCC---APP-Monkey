const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const authMiddleware = rewuire('../middlewares/validate');
const { registerSchema, loginSchema, resetPasswordSchema, updatePasswordSchema } = require('../validators/authValidator');

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

/**
 * @route   POST /auth/reset-password
 * @desc    Envia um e-mail para redefinição de senha
 * @access  Público
 */ 
router.post('/reset-password', validate(resetPasswordSchema, 'body'), authController.resetPassword);
/**
 * @route   POST /auth/update-password
 * @desc    Atualiza a senha do usuário autenticado
 * @access  Privado
 */
router.post('/update-password', validate(updatePasswordSchema, 'body'), authController.updatePassword);

module.exports = router;
// Exporta o roteador para ser usado no servidor principal