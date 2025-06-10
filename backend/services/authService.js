const admin = require('../firebaseAdmin');

/**
 * Registra um novo usuário no Firebase Auth
 * @param {Object} param0
 * @param {string} param0.email - Email do usuário
 * @param {string} param0.password - Senha do usuário
 * @returns {Object} - Dados do usuário criado
 * @throws {Error} - Se o email já estiver cadastrado ou outro erro do Firebase
 */
async function register({ email, password }) {
    try {
        // Cria o usuário no Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        return {
            uid: userRecord.uid,
            email: userRecord.email,
        };
    } catch (error) {
        // Padroniza erro para email já cadastrado
        if (error.code === 'auth/email-already-exists') {
            throw new Error('Email já cadastrado.');
        }
        // Lança outros erros do Firebase
        throw new Error('Erro ao registrar usuário.');
    }
}

/**
 * Faz login — precisa ser feito no frontend com Firebase Auth Client SDK
 * Aqui, apenas lança erro explicativo.
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
 * Apenas retorna true para manter interface consistente.
 */
async function logout(user) {
    // Firebase é stateless no logout. Basta o client esquecer o token.
    return true;
}

/**
 * Inicia processo de recuperação de senha — delega ao Firebase Auth
 * Deve ser feito no frontend com firebase.auth().sendPasswordResetEmail()
 */
async function forgotPassword(email) {
    throw new Error('Esta ação deve ser feita pelo cliente Firebase SDK.');
}

/**
 * Redefinição de senha — normalmente feita via link enviado por email
 * Deve ser feita no frontend com firebase.auth().confirmPasswordReset()
 */
async function resetPassword(token, newPassword) {
    throw new Error('Redefinição de senha deve ser feita no cliente com Firebase SDK.');
}

// Exporta as funções do serviço de autenticação
module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
};
