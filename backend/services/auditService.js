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

async function getLogsByUser(userId, page = 1, limit = 100) {
    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('userId', '==', userId)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
}

async function getLogsByActionType(actionType, page = 1, limit = 100) {
    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('actionType', '==', actionType)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getLogsBySeverity(severityLevel, page = 1, limit = 100) {
    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('severity', '==', severityLevel)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function createLog({userId, actionType, severity, message, date = new Date()}) {
    const logsRef = db.collection('auditLogs');
    const logData = {
        userId,
        actionType,
        severity,
        message,
        date: date.toISOString()
    };
    
    const docRef = await logsRef.add(logData);
    return { id: docRef.id, ...logData };
    
}

const docRef = await logsRef.add(logData);
    return { id: docRef.id, ...logData };
async function exportLogsToCSV(startDate, endDate) {
    const logs = await getLogsByDate(startDate, endDate);
    const csvRows = [
        ['ID', 'User ID', 'Action Type', 'Severity', 'Message', 'Date'],
        ...logs.map(log => [
            log.id,
            log.userId,
            log.actionType,
            log.severity,
            log.message,
            log.date
        ])
    ];

    return csvRows.map(row => row.join(',')).join('\n');
}

module.exports = {
    getLogsByDate,
    getLogsByUser,
    getLogsByActionType,
    getLogsBySeverity,
    createLog,
    exportLogsToCSV
};