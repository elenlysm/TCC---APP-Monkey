const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');
const openFinanceData = require('../mockData/openFinance.json');

/**
 * @desc    Autorização Open Finance (troca código por token e salva para o usuário)
 * @route   POST /openfinance/authorize
 */
const authorize = async (req, res, next) => {
    const { code, userId } = req.body;
    try {
        const tokens = await openFinanceService.exchangeCodeForToken(code);
        await tokenService.saveToken(userId, tokens);
        res.status(200).json({ message: 'Autorização realizada com sucesso.' });
    } catch (error) {
        next(error);
    }
};

const getStatements = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const statements = await openFinanceService.getStatements(userId);
        res.status(200).json({ data: statements, message: 'Extratos listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

const getTransactions = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const transactions = await openFinanceService.getTransactions(userId);
        res.status(200).json({ data: transactions, message: 'Transações listadas com sucesso.' });
    } catch (error) {
        next(error);
    }
};

const getBudgets = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const budgets = await openFinanceService.getBudgets(userId);
        res.status(200).json({ data: budgets, message: 'Orçamentos listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

const getOpenFinance = (req, res) => {
    try {
        res.status(200).json(openFinanceData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar disponibilidade' });
    }
};

/**
 * @desc    Retorna métricas da API Admin do Open Finance
 * @route   GET /openfinance/metrics
 */
const metrics = async (req, res, next) => {
    try {
        const data = await openFinanceService.getAdminMetrics();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authorize,
    getStatements,
    getTransactions,
    getBudgets,
    getOpenFinance,
    metrics
};
