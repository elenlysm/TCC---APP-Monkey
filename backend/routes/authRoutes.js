const express = require('express');
const router = express.Router();
const { auth } = require('./firebaseAdmin');

// ✅ Registro de usuário
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await auth.createUser({
            email,
            password,
        });
        res.status(201).json({ message: 'Usuário criado com sucesso', uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ Login - a autenticação com Firebase Auth (frontend ou backend) gera um token
// No backend, normalmente validamos o token enviado pelo cliente.

// ✅ Logout - normalmente no frontend (invalidar token). No backend, pode implementar revogação.
router.post('/logout', async (req, res) => {
    const { uid } = req.body;

    try {
        await auth.revokeRefreshTokens(uid);
        res.status(200).json({ message: 'Tokens revogados, usuário desconectado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
