const profileService = require('../services/profileService');

/**
 * @desc    Obtém o perfil do usuário autenticado
 * @route   GET /profile
 */
const getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const profile = await profileService.getProfile(req.user.id);
        if (!profile) {
            return res.status(404).json({ error: 'Perfil não encontrado.' });
        }

        res.status(200).json({ profile });
    } catch (error) {
        console.error(`Erro ao obter perfil do usuário ${req.user?.id}:`, error);
        res.status(500).json({
            error: 'Falha ao obter perfil.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Atualiza perfil do usuário
 * @route   PUT /profile
 */
const updateProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const updatedProfile = await profileService.updateProfile(req.user.id, req.body);
        res.status(200).json({ message: 'Perfil atualizado com sucesso.', updatedProfile });
    } catch (error) {
        console.error(`Erro ao atualizar perfil do usuário ${req.user?.id}:`, error);
        res.status(500).json({
            error: 'Falha ao atualizar perfil.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Atualiza senha do usuário
 * @route   PUT /profile/password
 */
const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Verifica se o usuário está autenticado
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        // Verifica se os campos obrigatórios foram enviados
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Senha antiga e nova senha são obrigatórias.' });
        }

        // Validação de força mínima da nova senha
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres.' });
        }

        await profileService.updatePassword(req.user.id, oldPassword, newPassword);
        res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    } catch (error) {
        console.error(`Erro ao atualizar senha do usuário ${req.user?.id}:`, error);

        // Retorna erro específico se a senha atual estiver incorreta
        if (error.message === 'Senha atual incorreta') {
            return res.status(400).json({ error: 'Senha atual incorreta.' });
        }

        res.status(500).json({
            error: 'Falha ao atualizar senha.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { getProfile, updateProfile, updatePassword };
