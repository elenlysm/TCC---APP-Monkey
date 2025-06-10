const { db } = require('../firebaseAdmin');

/**
 * Adiciona um novo documento à coleção especificada.
 * @param {string} collection - Nome da coleção
 * @param {Object} data - Dados do documento
 * @returns {string} - ID do documento criado
 */
const addDocument = async (collection, data) => {
    // Adiciona o documento e retorna o ID gerado pelo Firestore
    const docRef = await db.collection(collection).add(data);
    return docRef.id;
};

/**
 * Busca documentos de uma coleção, com suporte a múltiplos filtros (where).
 * @param {string} collection - Nome da coleção
 * @param {Array} queries - Array de arrays para filtros, ex: [['field', '==', value]]
 * @returns {Array} - Lista de documentos encontrados
 */
const getDocuments = async (collection, queries = []) => {
    try {
        let ref = db.collection(collection);
        // Aplica múltiplos filtros se fornecidos
        if (Array.isArray(queries) && queries.length) {
            queries.forEach(q => {
                ref = ref.where(...q);
            });
        }
        const snapshot = await ref.get();
        // Retorna cada documento como { id, ...dados }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        // Loga o erro para análise interna
        console.error('Erro ao buscar documentos:', error);
        // Lança erro padronizado para o controller
        throw new Error('Erro ao buscar documentos no Firestore.');
    }
};

/**
 * Atualiza um documento existente na coleção.
 * @param {string} collection - Nome da coleção
 * @param {string} id - ID do documento
 * @param {Object} data - Dados a serem atualizados
 * @returns {string} - ID do documento atualizado
 */
const updateDocument = async (collection, id, data) => {
    await db.collection(collection).doc(id).update(data);
    return id;
};

/**
 * Remove um documento da coleção.
 * @param {string} collection - Nome da coleção
 * @param {string} id - ID do documento
 * @returns {string} - ID do documento removido
 */
const deleteDocument = async (collection, id) => {
    await db.collection(collection).doc(id).delete();
    return id;
};

// Exporta as funções do serviço Firestore
module.exports = { addDocument, getDocuments, updateDocument, deleteDocument };
