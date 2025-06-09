// Importa o Firestore Admin SDK e utilitários
const { db } = require('../firebaseAdmin');
const { groupByCategory, validateUserId, fetchUserTransactions } = require('../utils/transactionUtils');

/**
 * @desc    Retorna relatório mensal de transações para um usuário.
 * @route   GET /reports/monthly?userId=&month=&year=
 */
const getMonthlyReport = async (req, res) => {
    const { userId, month, year } = req.query;

    // Valida se o userId foi informado e é válido
    if (!validateUserId(res, userId)) return;

    // Valida se os parâmetros de mês e ano foram informados
    if (!month || !year) {
        return res.status(400).json({ error: 'month e year são obrigatórios.' });
    }

    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    // Valida se mês e ano são números válidos
    if (isNaN(monthInt) || isNaN(yearInt)) {
        return res.status(400).json({ error: 'month e year devem ser números válidos.' });
    }

    try {
        // Busca as transações do usuário para o mês/ano especificados
        const transactions = await fetchUserTransactions(db, { userId, month: monthInt, year: yearInt });

        // Calcula o total e a contagem das transações
        const total = transactions.reduce((sum, t) => sum + t.amount, 0);

        // Retorna resposta padronizada
        res.status(200).json({
            data: {
                total,
                count: transactions.length,
                transactions
            },
            message: 'Relatório mensal gerado com sucesso.'
        });
    } catch (error) {
        console.error('Erro ao gerar relatório mensal:', error);
        res.status(500).json({
            error: 'Falha ao gerar relatório mensal.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Retorna resumo das transações agrupadas por categoria para um usuário.
 * @route   GET /reports/category-summary?userId=
 */
const getCategorySummary = async (req, res) => {
    const { userId } = req.query;

    // Valida se o userId foi informado e é válido
    if (!validateUserId(res, userId)) return;

    try {
        // Busca todas as transações do usuário
        const transactions = await fetchUserTransactions(db, { userId });

        // Agrupa as transações por categoria
        const summary = groupByCategory(transactions);

        // Retorna resposta padronizada
        res.status(200).json({
            data: summary,
            message: 'Resumo por categoria gerado com sucesso.'
        });
    } catch (error) {
        console.error('Erro ao gerar resumo por categoria:', error);
        res.status(500).json({
            error: 'Falha ao gerar resumo por categoria.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { getMonthlyReport, getCategorySummary };
