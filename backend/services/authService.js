const admin = require('../firebaseAdmin');
const firestoreService = require('./firestoreService');
//Registra um novo usuário no Firebase Auth e salva no Firestore

async function register({ email, password }) {
    try {
        //Cria o usuário no Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        //Salva no Firestore
        await firestoreService.createUserDocument(userRecord.uid, {
            email: userRecord.email,
            role: 'user',
        });
        return {
            uid: userRecord.uid,
            email: userRecord.email,
        };
    } catch (error) {
        if (error.code === 'auth/email-already-exists') {
            throw new Error('Email já cadastrado.');
        }
        throw new Error('Erro ao registrar usuário.');
    }
}

//Faz login 
async function login({ email, password }) {
    throw new Error(
        'Login deve ser feito no cliente com Firebase Auth. Envie o ID token para verificação.'
    );
}

//Faz logout
async function logout(user) {
    return true;
}

//Recuperação de senha 
async function forgotPassword(email) {
    throw new Error('Esta ação deve ser feita pelo cliente Firebase SDK.');
}

//Redefinição de senha
async function resetPassword(token, newPassword) {
    throw new Error('Redefinição de senha deve ser feita no cliente com Firebase SDK.');
}

//Exporta as funções do serviço de autenticação
module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
};
