const firestoreService = require('../services/firestoreService');

/**
 * @desc    Verifica status do sistema
 * @route   GET /health
 */
const healthCheck = (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date()
    });
};

/**
 * @desc    Verifica status do banco de dados
 * @route   GET /health/db
 */
const dbHealthCheck = async (req, res) => {
    try {
        // Simula uma consulta ao banco de dados
        await firestoreService.getDocuments('healthCheck');

        res.status(200).json({
            status: 'Database is healthy',
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Erro ao verificar status do banco de dados:', error);
        res.status(500).json({ error: 'Database is not healthy' });
    }
};

module.exports = {
    healthCheck,
    dbHealthCheck
};
// Exporta todas as funções de uma vez