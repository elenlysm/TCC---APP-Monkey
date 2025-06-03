const { fcm } = require('../firebaseAdmin');

/**
 * Envia notificação push via FCM
 * @param {string} token - Token FCM do dispositivo
 * @param {object} payload - Objeto com título e corpo da notificação
 */
const sendNotification = async (token, payload) => {
    try {
        const message = {
            token,
            notification: {
                title: payload.title,
                body: payload.body
            },
            data: payload.data || {}, // Dados customizados opcionais
        };
        const response = await fcm.send(message);
        return response; // retorna messageId do envio
    } catch (error) {
        throw new Error(`Erro ao enviar notificação: ${error.message}`);
    }
};

module.exports = { sendNotification };
