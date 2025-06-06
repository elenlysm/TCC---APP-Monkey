const authService = require('../services/authService');

/**
 * @desc    Registra um novo usuário
 * @route   POST /auth/register
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const user = await authService.register({ email, password });
        res.status(201).json({ message: 'Usuário registrado com sucesso.', user });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Falha ao registrar usuário.' });
    }
};

/**
 * @desc    Autentica um usuário
 * @route   POST /auth/login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const token = await authService.login({ email, password });
        res.status(200).json({ message: 'Login bem-sucedido.', token });
    } catch (error) {
        console.error('Erro no login:', error);

        if (error.message === 'Credenciais inválidas') {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        res.status(500).json({ error: 'Falha ao processar login.' });
    }
};

/**
 * @desc    Realiza logout
 * @route   POST /auth/logout
 */
const logout = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        await authService.logout(req.user);
        res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({ error: 'Falha ao realizar logout.' });
    }
};

/**
 * @desc    Recuperação de senha
 * @route   POST /auth/forgot-password
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório.' });
        }

        await authService.forgotPassword(email);
        res.status(200).json({ message: 'Email de recuperação enviado.' });
    } catch (error) {
        console.error('Erro na recuperação de senha:', error);
        res.status(500).json({ error: 'Falha ao enviar email de recuperação.' });
    }
};

/**
 * @desc    Redefinição de senha
 * @route   POST /auth/reset-password
 */
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
        }

        await authService.resetPassword(token, newPassword);
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        console.error('Erro na redefinição de senha:', error);
        res.status(500).json({ error: 'Falha ao redefinir senha.' });
    }
};

module.exports = { register, login, logout, forgotPassword, resetPassword };
