const authService = require('../services/authService');
const validator = require('validator'); // Para validação de email

/**
 * @desc    Registra um novo usuário
 * @route   POST /auth/register
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validação básica dos campos obrigatórios
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }
        // Validação de formato de email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Formato de email inválido.' });
        }
        // Validação de força mínima da senha
        if (password.length < 6) {
            return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
        }

        const user = await authService.register({ email, password });
        // Log de sucesso (opcional)
        // console.info(`Usuário registrado: ${email}`);
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

        // Validação básica dos campos obrigatórios
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }
        // Validação de formato de email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Formato de email inválido.' });
        }

        const token = await authService.login({ email, password });
        // Log de sucesso (opcional)
        // console.info(`Login realizado: ${email}`);
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
        // Verifica se o usuário está autenticado
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        await authService.logout(req.user);
        // Log de sucesso (opcional)
        // console.info(`Logout realizado: ${req.user.email}`);
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

        // Validação do campo obrigatório
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório.' });
        }
        // Validação de formato de email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Formato de email inválido.' });
        }

        await authService.forgotPassword(email);
        // Log de sucesso (opcional)
        // console.info(`Solicitação de recuperação de senha: ${email}`);
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

        // Validação dos campos obrigatórios
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
        }
        // Validação de força mínima da nova senha
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres.' });
        }

        await authService.resetPassword(token, newPassword);
        // Log de sucesso (opcional)
        // console.info(`Senha redefinida para token: ${token}`);
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        console.error('Erro na redefinição de senha:', error);
        res.status(500).json({ error: 'Falha ao redefinir senha.' });
    }
};

module.exports = { register, login, logout, forgotPassword, resetPassword };
