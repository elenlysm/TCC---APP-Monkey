// Importa o framework Express
const express = require('express');
// Cria um novo roteador do Express
const router = express.Router();
// Importa a função de envio de notificação do serviço correspondente
const { sendNotification } = require('../services/notificationService');
// Importa o middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @route   POST /notifications/send
 * @desc    Envia uma notificação push para um dispositivo usando FCM
 * @access  Privado (requer autenticação)
 */
router.post('/send', authMiddleware, async (req, res) => {
    const { token, title, body, data } = req.body;

    // Validação robusta dos campos obrigatórios e tipos
    if (
        !token || typeof token !== 'string' ||
        !title || typeof title !== 'string' ||
        !body || typeof body !== 'string'
    ) {
        return res.status(400).json({ error: 'token, title e body são obrigatórios e devem ser strings.' });
    }

    // Se data for enviado, deve ser um objeto
    if (data && typeof data !== 'object') {
        return res.status(400).json({ error: 'O campo data, se enviado, deve ser um objeto.' });
    }

    try {
        // Envia a notificação usando o serviço
        const response = await sendNotification(token, { title, body, data });

        // Retorna sucesso e o ID da mensagem enviada
        res.status(200).json({ message: 'Notificação enviada com sucesso.' });
    } catch (error) {
        // Loga o erro para análise interna
        console.error('Erro ao enviar notificação:', error);
        // Retorna erro genérico ao usuário
        res.status(500).json({ error: 'Erro ao enviar notificação.' });
    }
});

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
