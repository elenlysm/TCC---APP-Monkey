//Esse arquivo define funções que lidam com requisições HTTP relacionadas ao perfil do usuário autenticado,
//incluindo obtenção dos dados do perfil, atualização do perfil e atualização da senha.
//Essas funções são chamadas pelas rotas do sistema quando o cliente faz requisições do tipo GET /profile,
//PUT /profile e PUT /profile/password, respectivamente.

const profileService = require('../services/profileService');

/**
 * @desc    Obtém o perfil do usuário autenticado
 * @route   GET /profile
 */
const getProfile = async (req, res, next) => {
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
        next(error);
    }
};

/**
 * @desc    Atualiza perfil do usuário
 * @route   PUT /profile
 */
const updateProfile = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const updatedProfile = await profileService.updateProfile(req.user.id, req.body);
        res.status(200).json({ message: 'Perfil atualizado com sucesso.', updatedProfile });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Atualiza senha do usuário
 * @route   PUT /profile/password
 */
const updatePassword = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const { oldPassword, newPassword } = req.body;
        await profileService.updatePassword(req.user.id, oldPassword, newPassword);
        res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    } catch (error) {
        if (error.message === 'Senha atual incorreta') {
            return res.status(400).json({ error: 'Senha atual incorreta.' });
        }
        next(error);
    }
};

module.exports = { getProfile, updateProfile, updatePassword };
