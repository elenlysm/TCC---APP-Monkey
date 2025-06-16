const authService = require('../services/authService');
const firestoreService = require('../services/firestoreService');

/**
 * @desc    Registra um novo usuário
 * @route   POST /auth/register
 */
const register = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await authService.register({ email, password });
        res.status(201).json({ message: 'Usuário registrado com sucesso.', user });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: error.message || 'Falha ao registrar usuário.' });
    }
};

/**
 * @desc    Autentica um usuário
 * @route   POST /auth/login
 */
const login = async (req, res) => {
    try {
        // req.body validado pelo Joi
        const { email, password } = req.body;
        const token = await authService.login({ email, password });
        res.status(200).json({ message: 'Login bem-sucedido.', token });
    } catch (error) {
        console.error('Erro no login:', error);
        if (error.message === 'Credenciais inválidas') {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        res.status(500).json({ error: error.message || 'Falha ao processar login.' });
    }
};

/**
 * @desc    Realiza logout
 * @route   POST /auth/logout
 */
const logout = async (req, res) => {
    try {
        // Verifica se o usuário está autenticado (req.user deve ser preenchido por um middleware de autenticação)
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        // Chama o serviço para realizar logout
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
const resetPassword = async (req, res) => {
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

        // Chama o serviço para enviar email de recuperação
        await authService.forgotPassword(email);
        res.status(200).json({ message: 'Email de recuperação enviado.' });
    } catch (error) {
        console.error('Erro na recuperação de senha:', error);
        res.status(500).json({ error: 'Falha ao enviar email de recuperação.' });
    }
};

/**
 * @desc    Atualiza a senha do usuário autenticado
 * @route   POST /auth/update-password
 */
const updatePassword = async (req, res) => {
    try {
        // Verifica se o usuário está autenticado (req.user deve ser preenchido por um middleware de autenticação)
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const { currentPassword, newPassword } = req.body;

        // Validação dos campos obrigatórios
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias.' });
        }

        // Chama o serviço para atualizar a senha
        await authService.updatePassword(req.user.uid, currentPassword, newPassword);
        res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    } catch (error) {
        console.error('Erro na atualização de senha:', error);
        if (error.message === 'Senha atual inválida') {
            return res.status(401).json({ error: 'Senha atual inválida.' });
        }
        res.status(500).json({ error: error.message || 'Falha ao atualizar a senha.' });
    };
}

module.exports = {
    register,
    login,
    logout,
    resetPassword,
    updatePassword
};