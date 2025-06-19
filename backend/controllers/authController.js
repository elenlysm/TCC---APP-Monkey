//Esse arquivo define funções que lidam com requisições HTTP relacionadas à autenticação de usuários,
//como registro, login, logout, recuperação e atualização de senha. Essas funções são chamadas pelas
//rotas do sistema quando o cliente (ex: frontend) faz requisições do tipo POST/auth/login, etc.

const authService = require('../services/authService');
const firestoreService = require('../services/firestoreService');
//Importação de serviços responsáveis por autenticação e Firestore

/**
 * @desc    Registra um novo usuário
 * @route   POST /auth/register
 */
const register = async (req, res) =>
    {
    try {
        const { email, password } = req.body; //Extrai email e senha do corpo da requisição
        const user = await authService.register({ email, password }); //Chama o serviço de autenticação para registrar o novo usuário
        res.status(201).json({ message: 'Usuário registrado com sucesso.', user });
    } catch (error) { //Retorna status 201 (criado) com o usuário registrado
        console.error('Erro no registro:', error);
        res.status(500).json({ error: error.message || 'Falha ao registrar usuário.' }); //Em caso de erro, exibe no console e retorna erro 500 com mensagem
    }
};

/**
 * @desc    Autentica um usuário
 * @route   POST /auth/login
 */

const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extrai email e senha do corpo da requisição (validados previamente pelo Joi)
        const token = await authService.login({ email, password }); //Autentica o usuário e retorna um token JWT
        res.status(200).json({ message: 'Login bem-sucedido.', token }); //Retorna status 200 com o token
    } catch (error) {
        console.error('Erro no login:', error);
        if (error.message === 'Credenciais inválidas') {
            return res.status(401).json({ error: 'Credenciais inválidas.' }); //Retorna erro específico para credenciais inválidas
        }
        res.status(500).json({ error: error.message || 'Falha ao processar login.' }); //Caso contrário, erro genérico de servidor
    }
};

/**
 * @desc    Realiza logout
 * @route   POST /auth/logout
 */
const logout = async (req, res) => {
    try {
        //Verifica se o usuário está autenticado (middleware de autenticação deve preencher req.user)
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        
        await authService.logout(req.user); //Realiza logout através do serviço

        res.status(200).json({ message: 'Logout realizado com sucesso.' }); //Retorna status 200 com sucesso
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({ error: 'Falha ao realizar logout.' }); //Erro genérico de logout
    }
};

/**
 * @desc    Recuperação de senha
 * @route   POST /auth/forgot-password
 */
const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //Validação de email obrigatório
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório.' });
        }
        //Validação de formato de email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Formato de email inválido.' });
        }

        //Envia e-mail de recuperação via serviço
        await authService.forgotPassword(email);

        res.status(200).json({ message: 'Email de recuperação enviado.' }); //Retorna status 200 com sucesso
    } catch (error) {
        console.error('Erro na recuperação de senha:', error);
        res.status(500).json({ error: 'Falha ao enviar email de recuperação.' }); //Erro genérico de recuperação
    }
};

/**
 * @desc    Atualiza a senha do usuário autenticado
 * @route   POST /auth/update-password
 */
const updatePassword = async (req, res) => {
    try {
        //Verifica se o usuário está autenticado (req.user deve ser preenchido por um middleware de autenticação)
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const { currentPassword, newPassword } = req.body;

        //Validação dos campos obrigatórios
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias.' });
        }

        //Atualiza a senha através do serviço de autenticação
        await authService.updatePassword(req.user.uid, currentPassword, newPassword);

        res.status(200).json({ message: 'Senha atualizada com sucesso.' }); //Retorna status 200 com sucesso
    } catch (error) {
        console.error('Erro na atualização de senha:', error); //Retorna erro específico se a senha atual estiver incorreta
        if (error.message === 'Senha atual inválida') {
            return res.status(401).json({ error: 'Senha atual inválida.' });
        }
        res.status(500).json({ error: error.message || 'Falha ao atualizar a senha.' }); //Erro genérico de atualização de senha
    };
}

module.exports = {
    register,
    login,
    logout,
    resetPassword,
    updatePassword
};
//Exporta todas as funções do controller para serem usadas nas rotas