const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const authMiddleware = rewuire('../middlewares/validate');
const { registerSchema, loginSchema, resetPasswordSchema, updatePasswordSchema } = require('../validators/authValidator');
const { sendPasswordChangeEmail } = require('../services/emailService');
//Importação de middleware para validação de dados + requisições do controller 

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

router.post('/notify-password-change', async (req, res) => //Envia um e-mail notificando que a senha foi alterada
{
    const { email } = req.body;

    if (!email) { //Valida se o e-mail foi fornecido
        return res.status(400).json({ error: 'E-mail é obrigatório.' });
    }

    try { //Tenta enviar o e-mail de notificação
        await sendPasswordChangedEmail(email);
        console.log(`E-mail de confirmação de alteração de senha enviado para: ${email}`);
        res.status(200).json({ message: 'Notificação de alteração de senha enviada.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar a notificação.' });
    }
});

module.exports = router;
// Exporta o roteador para ser usado no servidor principal