const auditService = require('../services/auditService');

/**
 * @desc    Lista todos os logs de auditoria
 * @route   GET /audit/logs
 */
const getAllLogs = async (req, res) => {
    try {
        const logs = await auditService.getAllLogs();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs:', error);
        res.status(500).json({ error: 'Falha ao obter logs.' });
    }
};

/**
 * @desc    Lista logs de um usuário
 * @route   GET /audit/logs/:userId
 */
const getUserLogs = async (req, res) => {
    try {
        const logs = await auditService.getLogsByUser(req.params.userId);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs do usuário:', error);
        res.status(500).json({ error: 'Falha ao obter logs do usuário.' });
    }
};

/**
 * @desc    Lista logs por tipo de ação
 * @route   GET /audit/logs/action/:actionType
 */
const getLogsByActionType = async (req, res) => {
    try {
        const logs = await auditService.getLogsByActionType(req.params.actionType);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs por tipo de ação:', error);
        res.status(500).json({ error: 'Falha ao obter logs por tipo de ação.' });
    }
};

/**
 * @desc    Lista logs por data
 * @route   GET /audit/logs/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const getLogsByDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }

    try {
        const logs = await auditService.getLogsByDate(startDate, endDate);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs por data:', error);
        res.status(500).json({ error: 'Falha ao obter logs por data.' });
    }
};

/**
 * @desc    Lista logs por nível de severidade
 * @route   GET /audit/logs/severity/:severityLevel
 */
const getLogsBySeverity = async (req, res) => {
    try {
        const logs = await auditService.getLogsBySeverity(req.params.severityLevel);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs por nível de severidade:', error);
        res.status(500).json({ error: 'Falha ao obter logs por nível de severidade.' });
    }
};

/**
 * @desc    Lista logs por usuário e tipo de ação
 * @route   GET /audit/logs/user/:userId/action/:actionType
 */
const getUserLogsByActionType = async (req, res) => {
    try {
        const logs = await auditService.getUserLogsByActionType(req.params.userId, req.params.actionType);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs do usuário por tipo de ação:', error);
        res.status(500).json({ error: 'Falha ao obter logs do usuário por tipo de ação.' });
    }
};

/**
 * @desc    Lista logs por usuário e data
 * @route   GET /audit/logs/user/:userId/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const getUserLogsByDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }

    try {
        const logs = await auditService.getUserLogsByDate(req.params.userId, startDate, endDate);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs do usuário por data:', error);
        res.status(500).json({ error: 'Falha ao obter logs do usuário por data.' });
    }
};

/**
 * @desc    Lista logs por usuário e nível de severidade
 * @route   GET /audit/logs/user/:userId/severity/:severityLevel
 */
const getUserLogsBySeverity = async (req, res) => {
    try {
        const logs = await auditService.getUserLogsBySeverity(req.params.userId, req.params.severityLevel);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Erro ao obter logs do usuário por nível de severidade:', error);
        res.status(500).json({ error: 'Falha ao obter logs do usuário por nível de severidade.' });
    }
};

/**
 * @desc    Exporta logs para um arquivo CSV
 * @route   GET /audit/logs/export?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
const exportLogsToCSV = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios.' });
    }

    try {
        const csvData = await auditService.exportLogsToCSV(startDate, endDate);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=logs.csv');
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Erro ao exportar logs para CSV:', error);
        res.status(500).json({ error: 'Falha ao exportar logs para CSV.' });
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
