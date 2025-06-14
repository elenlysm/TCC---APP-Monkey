const { db } = require('../firebaseAdmin');

async function getLogsByDate(startDate, endDate, page = 1, limit = 100) {
    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
    getLogsByDate,
    // ...outros métodos
};