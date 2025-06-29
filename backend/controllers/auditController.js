//Esse arquivo define funções que lidam com requisições HTTP relacionadas aos logs de auditoria, como buscar, 
//filtrar e exportar logs. Essas funções são chamadas pelas rotas do sistema quando um cliente (ex: frontend) 
//faz requisições do tipo GET /audit/logs, por exemplo.

const auditService = require('../services/auditService');
//Importação de serviços responsáveis por autenticação e Firestore

const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
//Função utilitária para validar datas no formato YYYY-MM-DD

/**
 * @desc    Lista todos os logs de auditoria
 * @route   GET /audit/logs
 */
const getAllLogs = async (req, res, next) => {
    try {
        //Busca todos os logs de auditoria
        const logs = await auditService.getAllLogs();
        res.status(200).json({ data: logs, message: 'Logs listados com sucesso.' });
    } catch (error) {
        //Loga erro e retorna status 500
        console.error('Erro ao obter logs:', error);
        next(error); // Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs de um usuário específico
 * @route   GET /audit/logs/:userId
 */
const getUserLogs = async (req, res, next) => {
    try {
        //Valida se userId foi informado
        if (!req.params.userId) {
            return res.status(400).json({ error: 'userId é obrigatório.' });
        }
        //Busca logs do usuário
        const logs = await auditService.getLogsByUser(req.params.userId);
        res.status(200).json({ data: logs, message: 'Logs do usuário listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter logs do usuário:', { userId: req.params.userId, error });
        next(error); // Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs por tipo de ação
 * @route   GET /audit/logs/action/:actionType
 */
const getLogsByActionType = async (req, res, next) => {
    try {
        //Busca logs pelo tipo de ação
        const logs = await auditService.getLogsByActionType(req.params.actionType);
        res.status(200).json({ data: logs, message: 'Logs por tipo de ação listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter logs por tipo de ação:', { actionType: req.params.actionType, error });
        next(error); //Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs por data, com validação e paginação
 * @route   GET /audit/logs/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&page=1&limit=100
 */
const getLogsByDate = async (req, res, next) => {
    const { startDate, endDate, page, limit } = req.query;
    try {
        const logs = await auditService.getLogsByDate(startDate, endDate, page, limit);
        res.status(200).json({ data: logs, message: 'Logs por data listados com sucesso.' });
    } catch (error) {
        next(error); //Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs por nível de severidade
 * @route   GET /audit/logs/severity/:severityLevel
 */
const getLogsBySeverity = async (req, res, next) => {
    try {
        //Busca logs pelo nível de severidade
        const logs = await auditService.getLogsBySeverity(req.params.severityLevel);
        res.status(200).json({ data: logs, message: 'Logs por nível de severidade listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter logs por nível de severidade:', { severityLevel: req.params.severityLevel, error });
        next(error); //Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs por usuário e tipo de ação
 * @route   GET /audit/logs/user/:userId/action/:actionType
 */
const getUserLogsByActionType = async (req, res, next) => {
    try {
        //Valida se userId foi informado
        if (!req.params.userId) {
            return res.status(400).json({ error: 'userId é obrigatório.' });
        }
        //Busca logs do usuário por tipo de ação
        const logs = await auditService.getUserLogsByActionType(req.params.userId, req.params.actionType);
        res.status(200).json({ data: logs, message: 'Logs do usuário por tipo de ação listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter logs do usuário por tipo de ação:', { userId: req.params.userId, actionType: req.params.actionType, error });
        next(error); //Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs por usuário e data, com validação e paginação
 * @route   GET /audit/logs/user/:userId/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&page=1&limit=100
 */
const getUserLogsByDate = async (req, res, next) => {
    const { startDate, endDate, page = 1, limit = 100 } = req.query;
    //Validação dos parâmetros obrigatórios e formato de data
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'Datas devem estar no formato YYYY-MM-DD.' });
    }
    //Validação de paginação
    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
        return res.status(400).json({ error: 'page e limit devem ser números positivos.' });
    }
    try {
        //Busca logs do usuário por data com paginação
        const logs = await auditService.getUserLogsByDate(req.params.userId, startDate, endDate, Number(page), Number(limit));
        res.status(200).json({ data: logs, message: 'Logs do usuário por data listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter logs do usuário por data:', { userId: req.params.userId, startDate, endDate, error });
        next(error); //Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista logs por usuário e nível de severidade
 * @route   GET /audit/logs/user/:userId/severity/:severityLevel
 */
const getUserLogsBySeverity = async (req, res, next) => {
    try {
        //Valida se userId foi informado
        if (!req.params.userId) {
            return res.status(400).json({ error: 'userId é obrigatório.' });
        }
        //Busca logs do usuário por nível de severidade
        const logs = await auditService.getUserLogsBySeverity(req.params.userId, req.params.severityLevel);
        res.status(200).json({ data: logs, message: 'Logs do usuário por nível de severidade listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter logs do usuário por nível de severidade:', { userId: req.params.userId, severityLevel: req.params.severityLevel, error });
        next(error); //Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Exporta logs para um arquivo CSV, com validação de datas
 * @route   GET /audit/logs/export?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const exportLogsToCSV = async (req, res, next) => {
    const { startDate, endDate } = req.query;

    //Validação dos parâmetros obrigatórios e formato de data
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'Datas devem estar no formato YYYY-MM-DD.' });
    }

    try {
        //Exporta logs para CSV e envia como download
        const csvData = await auditService.exportLogsToCSV(startDate, endDate);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=logs.csv');
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Erro ao exportar logs para CSV:', { startDate, endDate, error });
        next(error); //Isso envia o erro para o errorHandler
    }
};

module.exports = {
    getAllLogs,
    getUserLogs,
    getLogsByActionType,
    getLogsByDate,
    getLogsBySeverity,
    getUserLogsByActionType,
    getUserLogsByDate,
    getUserLogsBySeverity,
    exportLogsToCSV
};
//Exporta todas as funções do controller para serem usadas nas rotas
