const { db } = require('../firebaseAdmin');

const COLLECTION = 'budgets';

/**
 * Adiciona um novo orçamento
 */
async function addBudget(data) {
    const docRef = await db.collection(COLLECTION).add(data);
    return docRef.id;
}

/**
 * Busca todos os orçamentos com paginação
 */
async function getBudgets({ page = 1, limit = 20 }) {
    const offset = (page - 1) * limit;
    const snapshot = await db.collection(COLLECTION)
        .orderBy('createdAt', 'desc')
        .offset(offset)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Atualiza um orçamento
 */
async function updateBudget(id, data) {
    await db.collection(COLLECTION).doc(id).update(data);
}

/**
 * Deleta um orçamento
 */
async function deleteBudget(id) {
    await db.collection(COLLECTION).doc(id).delete();
}

/**
 * Busca um orçamento por ID
 */
async function getBudgetById(id) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

/**
 * Busca orçamentos por campo específico
 */
async function getBudgetsByField(field, value) {
    const snapshot = await db.collection(COLLECTION).where(field, '==', value).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Busca orçamentos por intervalo de datas
 */
async function getBudgetsByDateRange(field, startDate, endDate) {
    const snapshot = await db.collection(COLLECTION)
        .where(field, '>=', startDate)
        .where(field, '<=', endDate)
        .orderBy(field, 'desc')
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
    addBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetById,
    getBudgetsByField,
    getBudgetsByDateRange,
};
