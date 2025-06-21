
const express = require('express'); //Importa o Express e cria um novo roteador
const router = express.Router();
const auditController = require('../controllers/auditController'); //Importa o controlador responsável pelas ações relacionadas aos logs de auditoria
const validate = require('../middlewares/validate'); //Importa middleware de validação
const { 
    dateQuerySchema,
    userIdParamSchema,
    actionTypeParamSchema,
    severityLevelParamSchema
    } = require('../validators/auditValidator'); 
//Importa os esquemas de validação usados para validar parâmetros da requisição

router.get('/logs', validate(dateQuerySchema), auditController.getLogsByDate);
//Define rota GET para buscar logs por data (com validação da query string)

router.get('/logs/:userId', validate(userIdParamSchema), auditController.getUserLogs);
//Define rota GET para buscar logs de um usuário específico (valida o parâmetro :userId)

router.get('/logs/action/:actionType', validate(actionTypeParamSchema), auditController.getLogsByActionType);
//Define rota GET para buscar logs por tipo de ação (valida o parâmetro :actionType)

router.get('/logs/severity/:severityLevel', validate(severityLevelParamSchema), auditController.getLogsBySeverity);
//Define rota GET para buscar logs por nível de severidade (valida o parâmetro :severityLevel)

router.get('/logs/user/:userId/date', validate(userIdParamSchema, 'params'), validate(dateQuerySchema, 'query'),  auditController.getUserLogsByDate);
//Define rota GET para buscar logs de um usuário por data (valida :userId nos params e data na query)

router.get('/logs/user/:userId/severity/:severityLevel', validate(userIdParamSchema, 'params'), validate(severityLevelParamSchema, 'params'), auditController.getUserLogsBySeverity);
//Define rota GET para buscar logs de um usuário com determinado nível de severidade

router.get('/logs/export', validate(dateQuerySchema, 'query'), auditController.exportLogsToCSV);
//Define rota GET para exportar logs em formato CSV (valida intervalo de data via query string)

module.exports = router;
//Exporta o roteador para ser utilizado no arquivo principal de rotas da aplicação