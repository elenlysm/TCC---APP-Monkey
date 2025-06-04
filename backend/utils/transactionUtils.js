/**
 * Agrupa as transações por categoria, somando os valores.
 * @param {Array} transactions - Lista de transações.
 * @returns {Object} - Resumo por categoria.
 */
function groupByCategory(transactions) {
    return transactions.reduce((summary, t) => {
        const category = t.category || 'Sem Categoria';
        summary[category] = (summary[category] || 0) + t.amount;
        return summary;
    }, {});
}

/**
 * Valida se o parâmetro userId foi enviado.
 * @param {Object} res - Objeto de resposta.
 * @param {string} userId - ID do usuário.
 * @returns {boolean} - true se válido, false se inválido.
 */
function validateUserId(res, userId) {
    if (!userId) {
        res.status(400).json({ error: 'userId é obrigatório.' });
        return false;
    }
    return true;
}

/**
 * Busca transações do usuário aplicando filtros dinâmicos.
 * @param {Object} db - Firestore database.
 * @param {Object} filters - Filtros a aplicar (userId obrigatório).
 * @returns {Promise<Array>} - Lista de transações.
 */
async function fetchUserTransactions(db, filters) {
    let query = db.collection('transactions').where('userId', '==', filters.userId);

    if (filters.month !== undefined) {
        query = query.where('month', '==', parseInt(filters.month, 10));
    }

    if (filters.year !== undefined) {
        query = query.where('year', '==', parseInt(filters.year, 10));
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data());
}

module.exports = { groupByCategory, validateUserId, fetchUserTransactions };
