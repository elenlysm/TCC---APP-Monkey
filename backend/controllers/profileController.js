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

        res.status(200).json(profile);
    } catch (error) {
        console.error(`Erro ao obter perfil do usuário ${req.user?.id}:`, error);
        res.status(500).json({ error: 'Falha ao obter perfil.' });
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
        res.status(500).json({ error: 'Falha ao atualizar perfil.' });
    }
};

/**
 * @desc    Atualiza senha do usuário
 * @route   PUT /profile/password
 */
const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Senha antiga e nova senha são obrigatórias.' });
        }

        await profileService.updatePassword(req.user.id, oldPassword, newPassword);
        res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    } catch (error) {
        console.error(`Erro ao atualizar senha do usuário ${req.user?.id}:`, error);

        if (error.message === 'Senha atual incorreta') {
            return res.status(400).json({ error: 'Senha atual incorreta.' });
        }

        res.status(500).json({ error: 'Falha ao atualizar senha.' });
    }
};

module.exports = { getProfile, updateProfile, updatePassword };
