const { fcm } = require('../firebaseAdmin');

/**
 * Envia notificação push via FCM
 * @param {string} token - Token FCM do dispositivo
 * @param {object} payload - Objeto com título e corpo da notificação
 * @returns {object} - Objeto com sucesso e ID da mensagem enviada
 * @throws {Error} - Se houver erro de validação ou envio
 */
const sendNotification = async (token, payload) => {
    // Validação do token FCM
    if (!token || typeof token !== 'string') {
        throw new Error('Token FCM inválido.');
    }
    // Validação do título e corpo da notificação
    if (!payload || typeof payload.title !== 'string' || typeof payload.body !== 'string') {
        throw new Error('Título e corpo da notificação são obrigatórios e devem ser strings.');
    }
    try {
        // Monta a mensagem para o FCM
        const message = {
            token,
            notification: {
                title: payload.title,
                body: payload.body
            },
            // Garante que data seja um objeto, mesmo se não enviado
            data: typeof payload.data === 'object' ? payload.data : {},
        };
        // Envia a notificação via FCM
        const response = await fcm.send(message);
        // Retorna sucesso e o ID da mensagem enviada
        return { success: true, messageId: response };
    } catch (error) {
        // Lança erro padronizado para o controller tratar
        throw new Error('Erro ao enviar notificação.');
    }
};

// Exporta a função para uso em outros módulos
module.exports = { sendNotification };
