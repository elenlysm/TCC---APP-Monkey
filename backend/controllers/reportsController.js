// Importa o Firestore Admin SDK e utilitários
const { db } = require('../firebaseAdmin');
const { groupByCategory, validateUserId, fetchUserTransactions } = require('../utils/transactionUtils');

/**
 * Retorna relatório mensal de transações para um usuário.
 * @route GET /reports/monthly?userId=&month=&year=
 */
const getMonthlyReport = async (req, res) => {
    const { userId, month, year } = req.query;

    if (!validateUserId(res, userId)) return;

    if (!month || !year) {
        return res.status(400).json({ error: 'month e year são obrigatórios.' });
    }

    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    if (isNaN(monthInt) || isNaN(yearInt)) {
        return res.status(400).json({ error: 'month e year devem ser números válidos.' });
    }

    try {
        const transactions = await fetchUserTransactions(db, { userId, month, year });

        const total = transactions.reduce((sum, t) => sum + t.amount, 0);

        res.status(200).json({
            total,
            count: transactions.length,
            transactions
        });
    } catch (error) {
        console.error('Erro ao gerar relatório mensal:', error);
        res.status(500).json({ error: 'Falha ao gerar relatório mensal.' });
    }
};

/**
 * Retorna resumo das transações agrupadas por categoria para um usuário.
 * @route GET /reports/category-summary?userId=
 */
const getCategorySummary = async (req, res) => {
    const { userId } = req.query;

    if (!validateUserId(res, userId)) return;

    try {
        const transactions = await fetchUserTransactions(db, { userId });

        const summary = groupByCategory(transactions);

        res.status(200).json(summary);
    } catch (error) {
        console.error('Erro ao gerar resumo por categoria:', error);
        res.status(500).json({ error: 'Falha ao gerar resumo por categoria.' });
    }
};

module.exports = { getMonthlyReport, getCategorySummary };
