const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');

/**
 * @desc    Autorização Open Finance
 * @route   POST /openfinance/authorize
 */
const authorize = async (req, res) => {
    const { code, userId } = req.body;

    // Validação dos campos obrigatórios e tipos
    if (!code || !userId || typeof code !== 'string' || typeof userId !== 'string') {
        return res.status(400).json({ error: 'code e userId são obrigatórios e devem ser strings.' });
    }

    try {
        const tokens = await openFinanceService.exchangeCodeForToken(code);
        await tokenService.saveToken(userId, tokens);
        // Log de sucesso (opcional)
        // console.info(`Open Finance autorizado para userId: ${userId}`);
        res.status(200).json({ message: 'Autorização realizada com sucesso.' });
    } catch (error) {
        console.error('Erro na autorização OpenFinance:', error);
        res.status(500).json({
            error: 'Falha ao processar autorização.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Coleta extratos
 * @route   POST /openfinance/statements
 */
const getStatements = async (req, res) => {
    const { userId } = req.body;

    // Validação do campo obrigatório e tipo
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId é obrigatório e deve ser string.' });
    }

    try {
        const statements = await openFinanceService.getStatements(userId);
        res.status(200).json({ statements });
    } catch (error) {
        console.error('Erro ao obter extratos:', error);
        res.status(500).json({
            error: 'Falha ao obter extratos.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Coleta transações    
 * @route   POST /openfinance/transactions
 */
const getTransactions = async (req, res) => {
    const { userId } = req.body;

    // Validação do campo obrigatório e tipo
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId é obrigatório e deve ser string.' });
    }

    try {
        const transactions = await openFinanceService.getTransactions(userId);
        res.status(200).json({ transactions });
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({
            error: 'Falha ao obter transações.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    authorize,
    getStatements,
    getTransactions
};