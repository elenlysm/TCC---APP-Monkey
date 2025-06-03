const { db } = require('../firebaseAdmin');

const addDocument = async (collection, data) => {
    const docRef = await db.collection(collection).add(data);
    return docRef.id;
};

const getDocuments = async (collection, query = null) => {
    let snapshot;
    if (query) {
        snapshot = await db.collection(collection).where(...query).get();
    } else {
        snapshot = await db.collection(collection).get();
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updateDocument = async (collection, id, data) => {
    await db.collection(collection).doc(id).update(data);
    return id;
};

const deleteDocument = async (collection, id) => {
    await db.collection(collection).doc(id).delete();
    return id;
};

module.exports = { addDocument, getDocuments, updateDocument, deleteDocument };
