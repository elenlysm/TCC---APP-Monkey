const firestoreService = require('../services/firestoreService');

/**
 * @desc    Verifica status do sistema (health check geral)
 * @route   GET /health
 */
const healthCheck = (req, res) => {
    res.status(200).json({
        status: 'OK', // Indica que o sistema está rodando
        uptime: process.uptime(), // Tempo de atividade do processo em segundos
        nodeVersion: process.version, // Versão do Node.js em uso
        env: process.env.NODE_ENV || 'development', // Ambiente atual (development, production, etc)
        timestamp: new Date().toISOString() // Data/hora da verificação
    });
};

/**
 * @desc    Verifica status do banco de dados
 * @route   GET /health/db
 */
const dbHealthCheck = async (req, res, next) => {
    try {
        // Tenta buscar documentos em uma coleção de health check (pode ser configurável via env)
        await firestoreService.getDocuments(process.env.HEALTH_COLLECTION || 'healthCheck');

        // Se não lançar erro, o banco está saudável
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

/**
 * @desc    Lista todos os orçamentos
 * @route   GET /orcamentos
 */
const listarOrcamentos = async (req, res, next) => {
    try {
        // Busca todos os documentos da coleção 'orcamentos' no Firestore
        const budgets = await firestoreService.getDocuments('orcamentos');

        // Retorna a lista de orçamentos encontrada
        res.status(200).json({ data: budgets, message: 'Orçamentos listados com sucesso.' });
    } catch (error) {
        // Loga o erro para análise
        console.error('Erro ao listar orçamentos:', error);

        // Retorna erro detalhado apenas em ambiente de desenvolvimento
        res.status(500).json({
            error: 'Erro ao listar orçamentos',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Exporta todas as funções do controller para uso nas rotas
module.exports = {
    healthCheck,
    dbHealthCheck,
    listarOrcamentos
};