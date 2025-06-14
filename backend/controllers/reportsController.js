// Importa o Firestore Admin SDK e utilitários
const { db } = require('../firebaseAdmin');
const { groupByCategory, fetchUserTransactions } = require('../utils/transactionUtils');

/**
 * @desc    Retorna relatório mensal de transações para um usuário.
 * @route   GET /reports/monthly?userId=&month=&year=
 */
const getMonthlyReport = async (req, res, next) => {
    const { userId, month, year } = req.query;

    try {
        // Busca as transações do usuário para o mês/ano especificados
        const transactions = await fetchUserTransactions(db, { userId, month: Number(month), year: Number(year) });

        // Calcula o total e a contagem das transações
        const total = transactions.reduce((sum, t) => sum + t.amount, 0);

        res.status(200).json({
            data: {
                total,
                count: transactions.length,
                transactions
            },
            message: 'Relatório mensal gerado com sucesso.'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Retorna resumo das transações agrupadas por categoria para um usuário.
 * @route   GET /reports/category-summary?userId=
 */
const getCategorySummary = async (req, res, next) => {
    const { userId } = req.query;

    try {
        const transactions = await fetchUserTransactions(db, { userId });
        const summary = groupByCategory(transactions);

        res.status(200).json({
            data: summary,
            message: 'Resumo por categoria gerado com sucesso.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getMonthlyReport, getCategorySummary };
