const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { auth } = require('../firebaseAdmin');

/**
 * @route   POST /auth/register
 * @desc    Registra um novo usuário no Firebase Auth
 * @access  Público
 */
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Email inválido.'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.')
    ],
    async (req, res) => {
        // Validação dos campos de entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Retorna o primeiro erro de validação encontrado
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const { email, password } = req.body;

        try {
            // Cria o usuário no Firebase Auth
            const userRecord = await auth.createUser({ email, password });
            res.status(201).json({
                message: 'Usuário criado com sucesso.',
                uid: userRecord.uid,
            });
        } catch (error) {
            // Loga o erro para análise interna
            console.error('Erro no registro de usuário:', error);
            // Retorna erro genérico ao usuário
            res.status(500).json({ error: 'Falha ao criar usuário.' });
        }
    }
);

/**
 * @route   POST /auth/logout
 * @desc    Revoga os tokens de refresh do usuário (logout)
 * @access  Privado (idealmente, use autenticação e extraia o UID do token)
 */
router.post(
    '/logout',
    [
        body('uid').notEmpty().withMessage('UID é obrigatório.')
    ],
    async (req, res) => {
        // Validação do campo UID
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Retorna o primeiro erro de validação encontrado
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const { uid } = req.body;

        try {
            // Revoga os tokens de refresh do usuário no Firebase
            await auth.revokeRefreshTokens(uid);
            res.status(200).json({
                message: 'Tokens revogados com sucesso, usuário desconectado.',
            });
        } catch (error) {
            // Loga o erro para análise interna
            console.error('Erro ao revogar tokens:', error);
            // Retorna erro genérico ao usuário
            res.status(500).json({ error: 'Falha ao revogar tokens.' });
        }
    }
);

module.exports = router;
