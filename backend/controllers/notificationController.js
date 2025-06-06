const notificationService = require('../services/notificationService');

/**
 * @desc    Envia uma notificação
 * @route   POST /notifications
 */
const sendNotification = async (req, res) => {
    try {
        await notificationService.sendNotification(req.body);
        res.status(200).json({ message: 'Notificação enviada com sucesso.' });
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        res.status(500).json({ error: 'Falha ao enviar notificação.' });
    }
};

/**
 * @desc    Lista notificações do usuário
 * @route   GET /notifications/:userId
 */
const listNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getNotifications(req.params.userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao listar notificações:', error);
        res.status(500).json({ error: 'Falha ao listar notificações.' });
    }
};

/**
 * @desc    Marca notificação como lida
 * @route   PUT /notifications/:id/read
 */
const markAsRead = async (req, res) => {
    try {
        await notificationService.markAsRead(req.params.id);
        res.status(200).json({ message: 'Notificação marcada como lida.' });
    } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
        res.status(500).json({ error: 'Falha ao marcar notificação.' });
    }
};

/**
 * @desc    Marca notificação como não lida
 * @route   PUT /notifications/:id/unread
 */
const markAsUnread = async (req, res) => {
    try {
        await notificationService.markAsUnread(req.params.id);
        res.status(200).json({ message: 'Notificação marcada como não lida.' });
    } catch (error) {
        console.error('Erro ao marcar notificação como não lida:', error);
        res.status(500).json({ error: 'Falha ao marcar notificação.' });
    }
};

/**
 * @desc    Deleta uma notificação
 * @route   DELETE /notifications/:id
 */
const deleteNotification = async (req, res) => {
    try {
        await notificationService.deleteNotification(req.params.id);
        res.status(200).json({ message: 'Notificação deletada com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar notificação:', error);
        res.status(500).json({ error: 'Falha ao deletar notificação.' });
    }
};

/**
 * @desc    Obtém uma notificação por ID
 * @route   GET /notifications/:id
 */
const getNotificationById = async (req, res) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notificação não encontrada.' });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error('Erro ao obter notificação:', error);
        res.status(500).json({ error: 'Falha ao obter notificação.' });
    }
};

/**
 * @desc    Obtém notificações por status
 * @route   GET /notifications/status/:status
 */
const getNotificationsByStatus = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByStatus(req.params.status);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por status:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por status.' });
    }
};

/**
 * @desc    Obtém notificações por data
 * @route   GET /notifications/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const getNotificationsByDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }

    try {
        const notifications = await notificationService.getNotificationsByDate(startDate, endDate);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por data:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por data.' });
    }
};

/**
 * @desc    Obtém notificações por tipo
 * @route   GET /notifications/type/:type
 */
const getNotificationsByType = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByType(req.params.type);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por tipo:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por tipo.' });
    }
};

/**
 * @desc    Obtém notificações por usuário
 * @route   GET /notifications/user/:userId
 */
const getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByUser(req.params.userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por usuário:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por usuário.' });
    }
};

/**
 * @desc    Obtém notificações por prioridade
 * @route   GET /notifications/priority/:priority
 */
const getNotificationsByPriority = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByPriority(req.params.priority);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por prioridade:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por prioridade.' });
    }
};

/**
 * @desc    Obtém notificações por canal
 * @route   GET /notifications/channel/:channel
 */
const getNotificationsByChannel = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByChannel(req.params.channel);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por canal:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por canal.' });
    }
};

/**
 * @desc    Obtém notificações por grupo
 * @route   GET /notifications/group/:groupId
 */
const getNotificationsByGroup = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByGroup(req.params.groupId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Erro ao obter notificações por grupo:', error);
        res.status(500).json({ error: 'Falha ao obter notificações por grupo.' });
    }
};

// Exporta todas as funções de uma vez
module.exports = { 
    sendNotification, 
    listNotifications, 
    markAsRead, 
    markAsUnread, 
    deleteNotification, 
    getNotificationById, 
    getNotificationsByStatus, 
    getNotificationsByDate, 
    getNotificationsByType, 
    getNotificationsByUser, 
    getNotificationsByPriority, 
    getNotificationsByChannel, 
    getNotificationsByGroup 
};
