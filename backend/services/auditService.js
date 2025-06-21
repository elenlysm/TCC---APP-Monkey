const { db } = require('../firebaseAdmin');
//Importa o acesso ao Firestore Admin

async function getLogsByDate(startDate, endDate, page = 1, limit = 100) { //Referência à coleção de logs

    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();
    //Consulta os logs filtrando pelo intervalo de datas, ordenando pela data

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); //Retorna os logs formatados com id + dados do documento
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
    
} //Recupera logs de um usuário específico, com paginação

async function getLogsByActionType(actionType, page = 1, limit = 100) {
    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('actionType', '==', actionType)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} //Recupera logs filtrando por tipo de ação realizada, com paginação

async function getLogsBySeverity(severityLevel, page = 1, limit = 100) {
    const logsRef = db.collection('auditLogs');
    const snapshot = await logsRef
        .where('severity', '==', severityLevel)
        .orderBy('date', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} //Recupera logs filtrando por nível de severidade (ex: info, warning, error), com paginação

async function createLog({userId, actionType, severity, message, date = new Date()}) {
    const logsRef = db.collection('auditLogs');
    const logData = {
        userId,
        actionType,
        severity,
        message,
        date: date.toISOString()
    }; //Cria e armazena um novo log de auditoria no Firestore.
    
    const docRef = await logsRef.add(logData);
    return { id: docRef.id, ...logData };
    
}

const docRef = await logsRef.add(logData); //Exporta os logs como um arquivo CSV baseado em um intervalo de datas.
    return { id: docRef.id, ...logData }; 
async function exportLogsToCSV(startDate, endDate) {
    const logs = await getLogsByDate(startDate, endDate); //Reutiliza a função de busca por data
    const csvRows = [
        ['ID', 'User ID', 'Action Type', 'Severity', 'Message', 'Date'], //Cada log convertido em linha CSV
        ...logs.map(log => [
            log.id,
            log.userId,
            log.actionType,
            log.severity,
            log.message,
            log.date
        ])
    ];

    return csvRows.map(row => row.join(',')).join('\n'); //Junta as linhas usando vírgulas e quebras de linha

}

 //Exporta todas as funções para serem utilizadas em outros arquivos