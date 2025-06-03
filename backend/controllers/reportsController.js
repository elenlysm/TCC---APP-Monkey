const { db } = require('../firebaseAdmin');

const getMonthlyReport = async (req, res) => {
    const { userId, month, year } = req.query;

    try {
        const snapshot = await db.collection('transactions')
            .where('userId', '==', userId)
            .where('month', '==', parseInt(month))
            .where('year', '==', parseInt(year))
            .get();

        const transactions = snapshot.docs.map(doc => doc.data());

        const total = transactions.reduce((sum, t) => sum + t.amount, 0);

        res.status(200).json({
            total,
            count: transactions.length,
            transactions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategorySummary = async (req, res) => {
    const { userId } = req.query;

    try {
        const snapshot = await db.collection('transactions')
            .where('userId', '==', userId)
            .get();

        const transactions = snapshot.docs.map(doc => doc.data());

        const summary = {};

        transactions.forEach(t => {
            if (!summary[t.category]) {
                summary[t.category] = 0;
            }
            summary[t.category] += t.amount;
        });

        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMonthlyReport, getCategorySummary };
