const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');
const validate = require('../middlewares/validate');
const {
    sendNotificationSchema,
    userIdParamSchema,
    idParamSchema,
    statusParamSchema,
    typeParamSchema,
    priorityParamSchema,
    channelParamSchema,
    groupIdParamSchema,
    dateQuerySchema
} = require('../validators/notificationValidator');

//Enviar notificação
router.post('/', validate(sendNotificationSchema, 'body'), controller.sendNotification);

//Listar notificações do usuário
router.get('/:userId', validate(userIdParamSchema, 'params'), controller.listNotifications);

//Marcar como lida
router.put('/:id/read', validate(idParamSchema, 'params'), controller.markAsRead);

//Marcar como não lida
router.put('/:id/unread', validate(idParamSchema, 'params'), controller.markAsUnread);

//Deletar notificação
router.delete('/:id', validate(idParamSchema, 'params'), controller.deleteNotification);

//Obter notificação por ID
router.get('/id/:id', validate(idParamSchema, 'params'), controller.getNotificationById);

//Por status
router.get('/status/:status', validate(statusParamSchema, 'params'), controller.getNotificationsByStatus);

//Por data
router.get('/date', validate(dateQuerySchema, 'query'), controller.getNotificationsByDate);

//Por tipo
router.get('/type/:type', validate(typeParamSchema, 'params'), controller.getNotificationsByType);

//Por usuário
router.get('/user/:userId', validate(userIdParamSchema, 'params'), controller.getNotificationsByUser);

//Por prioridade
router.get('/priority/:priority', validate(priorityParamSchema, 'params'), controller.getNotificationsByPriority);

//Por canal
router.get('/channel/:channel', validate(channelParamSchema, 'params'), controller.getNotificationsByChannel);

//Por grupo
router.get('/group/:groupId', validate(groupIdParamSchema, 'params'), controller.getNotificationsByGroup);

module.exports = router;
