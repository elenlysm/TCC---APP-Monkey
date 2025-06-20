//Esse arquivo define funções que lidam com requisições HTTP relacionadas à integração com Open Finance,
//incluindo autorização do usuário (troca código por token), e coleta de dados financeiros como extratos,
//transações e orçamentos. Essas funções são acionadas pelas rotas POST /openfinance/authorize, /statements,
//transactions e /budgets, para que o frontend ou outro cliente possa interagir com os serviços Open Finance.

const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');

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

/**
 * @desc    Coleta extratos bancários do usuário
 * @route   POST /openfinance/statements
 */
const getStatements = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const statements = await openFinanceService.getStatements(userId);
        res.status(200).json({ data: statements, message: 'Extratos listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Coleta transações bancárias do usuário
 * @route   POST /openfinance/transactions
 */
const getTransactions = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const transactions = await openFinanceService.getTransactions(userId);
        res.status(200).json({ data: transactions, message: 'Transações listadas com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Coleta orçamentos do usuário
 * @route   POST /openfinance/budgets
 */
const getBudgets = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const budgets = await openFinanceService.getBudgets(userId);
        res.status(200).json({ data: budgets, message: 'Orçamentos listados com sucesso.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authorize,
    getStatements,
    getTransactions,
    getBudgets
};