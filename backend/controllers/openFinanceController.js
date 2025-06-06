const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');

/**
 * @desc    Autorização Open Finance
 * @route   POST /openfinance/authorize
 */
const authorize = async (req, res) => {
    const { code, userId } = req.body;

    if (!code || !userId) {
        return res.status(400).json({ error: 'code e userId são obrigatórios.' });
    }

    try {
        const tokens = await openFinanceService.exchangeCodeForToken(code);
        await tokenService.saveToken(userId, tokens);
        res.status(200).json({ message: 'Autorização realizada com sucesso.' });
    } catch (error) {
        console.error('Erro na autorização OpenFinance:', error);
        res.status(500).json({ error: 'Falha ao processar autorização.' });
    }
};

/**
 * @desc    Coleta extratos
 * @route   POST /openfinance/statements
 */
const getStatements = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId é obrigatório.' });
    }

    try {
        const statements = await openFinanceService.getStatements(userId);
        res.status(200).json(statements);
    } catch (error) {
        console.error('Erro ao obter extratos:', error);
        res.status(500).json({ error: 'Falha ao obter extratos.' });
    }
};

/**
 * @desc    Coleta transações    
 * @route   POST /openfinance/transactions
 */
const getTransactions = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId é obrigatório.' });
    }

    try {
        const transactions = await openFinanceService.getTransactions(userId);
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({ error: 'Falha ao obter transações.' });
    }
};

module.exports = {
    authorize,
    getStatements,
    getTransactions
};