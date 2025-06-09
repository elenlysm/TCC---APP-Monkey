const admin = require('../firebaseAdmin');

/**
 * Registra um novo usuário no Firebase Auth
 */
async function register({ email, password }) {
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        return {
            uid: userRecord.uid,
            email: userRecord.email,
        };
    } catch (error) {
        if (error.code === 'auth/email-already-exists') {
            throw new Error('Email já cadastrado.');
        }
        throw error;
    }
}

/**
 * Faz login — precisa ser feito no frontend com Firebase Auth Client SDK
 * Aqui, apenas verifica se o usuário existe
 */
async function login({ email, password }) {
    // Login real com email/senha deve ser feito no app cliente (React Native, Web)
    // No backend, você pode verificar tokens com verifyIdToken()
    throw new Error(
        'Login deve ser feito no cliente com Firebase Auth. Envie o ID token para verificação.'
    );
}

/**
 * Faz logout — não necessário no backend com Firebase Auth
 */
async function logout(user) {
    // Firebase é stateless no logout. Basta o client esquecer o token.
    return true;
}

/**
 * Inicia processo de recuperação de senha — delega ao Firebase Auth
 */
async function forgotPassword(email) {
    // Firebase recomenda fazer isso no app cliente com firebase.auth().sendPasswordResetEmail()
    throw new Error('Esta ação deve ser feita pelo cliente Firebase SDK.');
}

/**
 * Redefinição de senha — normalmente feita via link enviado por email
 */
async function resetPassword(token, newPassword) {
    // Isso também deve ser feito no frontend com firebase.auth().confirmPasswordReset()
    throw new Error('Redefinição de senha deve ser feita no cliente com Firebase SDK.');
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
};
