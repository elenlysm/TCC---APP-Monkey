const { db } = require('../firebaseAdmin');

const createUserDocument = async (userId, userData) => {
    try {
        await db.collection('users').doc(userId).set({
            ...userData,
            createdAt: new Date()
        });
        console.log('Usuário salvo no Firestore com sucesso.');
    } catch(error){
        console.error('Erro ao salvar usuário no Firestore', error);
        throw error;
    }
};

// Adiciona um novo documento à coleção 

const addDocument = async(collection, data) => {
    const docRef = await db.collection(collection).add(data);
    return docRef.id;
};


// Busca documentos de uma coleção
const getDocuments = async(collection, queries = []) => {
    try {
        let ref = db.collection(collection);
        if (Array.isArray(queries) && queries.length) {
            queries.forEach(q => {
                ref = ref.where(...q);
            });
        }
        const snapshot = await ref.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        throw new Error('Erro ao buscar documentos no Firestore.');
    }
};

//Atualiza um documento 
const updateDocument = async (collection, id, data) => {
    await db.collection(collection).doc(id).update(data);
    return id;
};

//Deleta um documento
const deleteDocument = async (collection, id) => {
    await db.collection(collection).doc(id).delete();
    return id;
};

//Exporta as funções 
module.exports = { createUserDocument,addDocument, getDocuments, updateDocument, deleteDocument };
