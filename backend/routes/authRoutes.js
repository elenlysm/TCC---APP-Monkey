const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { auth } = require('../firebaseAdmin');

// ✅ Registro de usuário
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Email inválido.'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const userRecord = await auth.createUser({ email, password });
            res.status(201).json({
                message: 'Usuário criado com sucesso.',
                uid: userRecord.uid,
            });
        } catch (error) {
            console.error('Erro no registro de usuário:', error);
            res.status(400).json({ error: error.message || 'Falha ao criar usuário.' });
        }
    }
);

// ✅ Logout (revogação de tokens)
router.post(
    '/logout',
    [
        body('uid').notEmpty().withMessage('UID é obrigatório.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uid } = req.body;

        try {
            await auth.revokeRefreshTokens(uid);
            res.status(200).json({
                message: 'Tokens revogados com sucesso, usuário desconectado.',
            });
        } catch (error) {
            console.error('Erro ao revogar tokens:', error);
            res.status(400).json({ error: error.message || 'Falha ao revogar tokens.' });
        }
    }
);

module.exports = router;
// Compare this snippet from backend/controllers/authController.js:
//  * @route   POST /auth/recover
