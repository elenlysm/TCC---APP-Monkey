const express = require('express');
const router = express.Router();
const { sendNotification } = require('../services/notificationService');
const authMiddleware = require('../authMiddleware');

router.post('/send', authMiddleware, async (req, res) => {
    const { token, title, body, data } = req.body;
    if (!token || !title || !body) {
        return res.status(400).json({ error: 'token, title e body são obrigatórios' });
    }
    try {
        const response = await sendNotification(token, { title, body, data });
        res.status(200).json({ message: 'Notificação enviada', response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
