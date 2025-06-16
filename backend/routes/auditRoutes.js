import { date } from 'joi';

const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const validate = require('../middlewares/validate');
const { 
    dateQuerySchema,
    userIdParamSchema,
    actionTypeParamSchema,
    severityLevelParamSchema
    } = require('../validators/auditValidator');

router.get('/logs', validate(dateQuerySchema), auditController.getLogsByDate);

router.get('/logs/:userId', validate(userIdParamSchema), auditController.getUserLogs);

router.get('/logs/action/:actionType', validate(actionTypeParamSchema), auditController.getLogsByActionType);

router.get('/logs/severity/:severityLevel', validate(severityLevelParamSchema), auditController.getLogsBySeverity);

router.get('/logs/user/:userId/date', validate(userIdParamSchema, 'params'), validate(dateQuerySchema, 'query'),  auditController.getUserLogsByDate);

router.get('/logs/user/:userId/severity/:severityLevel', validate(userIdParamSchema, 'params'), validate(severityLevelParamSchema, 'params'), auditController.getUserLogsBySeverity);

router.get('/logs/export', validate(dateQuerySchema, 'query'), auditController.exportLogsToCSV);

module.exports = router;