const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');

/**
 * @desc    Autorização Open Finance (troca código por token e salva para o usuário)
 * @route   POST /openfinance/authorize
 */
const authorize = async (req, res) => {
    const { code, userId } = req.body;

    // Validação dos campos obrigatórios e tipos
    if (!code || !userId || typeof code !== 'string' || typeof userId !== 'string') {
        return res.status(400).json({ error: 'code e userId são obrigatórios e devem ser strings.' });
    }

    try {
        // Troca o código de autorização por tokens de acesso
        const tokens = await openFinanceService.exchangeCodeForToken(code);
        // Salva os tokens para o usuário
        await tokenService.saveToken(userId, tokens);
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
 * @desc    Coleta extratos bancários do usuário
 * @route   POST /openfinance/statements
 */
const getStatements = async (req, res) => {
    const { userId } = req.body;

    // Validação do campo obrigatório e tipo
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId é obrigatório e deve ser string.' });
    }

    try {
        // Busca extratos do usuário via Open Finance Service
        const statements = await openFinanceService.getStatements(userId);
        res.status(200).json({ data: statements, message: 'Extratos listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter extratos:', error);
        res.status(500).json({
            error: 'Falha ao obter extratos.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Coleta transações bancárias do usuário
 * @route   POST /openfinance/transactions
 */
const getTransactions = async (req, res) => {
    const { userId } = req.body;

    // Validação do campo obrigatório e tipo
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId é obrigatório e deve ser string.' });
    }

    try {
        // Busca transações do usuário via Open Finance Service
        const transactions = await openFinanceService.getTransactions(userId);
        // Sugestão: padronize a resposta para { data, message }
        res.status(200).json({ data: transactions, message: 'Transações listadas com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({
            error: 'Falha ao obter transações.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Coleta orçamentos do usuário
 * @route   POST /openfinance/budgets
 */
const getBudgets = async (req, res) => {
    const { userId } = req.body;

    // Validação do campo obrigatório e tipo
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId é obrigatório e deve ser string.' });
    }

    try {
        // Busca orçamentos do usuário via Open Finance Service
        const budgets = await openFinanceService.getBudgets(userId);
        res.status(200).json({ data: budgets, message: 'Orçamentos listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao obter orçamentos:', error);
        res.status(500).json({
            error: 'Falha ao obter orçamentos.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Exporta todas as funções do controller para uso nas rotas
module.exports = {
    authorize,
    getStatements,
    getTransactions,
    getBudgets
};