const firestoreService = require('../services/firestoreService');

/**
 * @desc    Verifica status do sistema (health check geral)
 * @route   GET /health
 */
const healthCheck = (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(), // Tempo de atividade do processo em segundos
        nodeVersion: process.version, // Versão do Node.js
        env: process.env.NODE_ENV || 'development', // Ambiente atual
        timestamp: new Date().toISOString() // Timestamp padronizado
    });
};

/**
 * @desc    Verifica status do banco de dados
 * @route   GET /health/db
 */
const dbHealthCheck = async (req, res) => {
    try {
        // Simula uma consulta ao banco de dados (coleção pode ser configurável)
        await firestoreService.getDocuments(process.env.HEALTH_COLLECTION || 'healthCheck');

        // Retorna status saudável do banco
        res.status(200).json({
            status: 'Database is healthy',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        // Loga o erro para análise
        console.error('Erro ao verificar status do banco de dados:', error);

        // Retorna erro detalhado apenas em ambiente de desenvolvimento
        res.status(500).json({
            error: 'Database is not healthy',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            timestamp: new Date().toISOString()
        });
    }
};

// Exporta todas as funções do controller
module.exports = {
    healthCheck,
    dbHealthCheck
};