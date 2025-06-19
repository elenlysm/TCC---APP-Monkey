//Esse arquivo define funções que lidam com requisições HTTP relacionadas à gestão de configurações do sistema,
//como obter todas as configurações, criar, atualizar, deletar e buscar configurações por chave ou categoria.
//Essas funções são chamadas pelas rotas do sistema quando o cliente faz requisições do tipo GET /settings,
//POST /settings, PUT /settings, DELETE /settings/:key, entre outras.

const settingsService = require('../services/settingsService');

/**
 * @desc    Obtém todas as configurações
 * @route   GET /settings
 */
const getSettings = async (req, res, next) => {
    try {
        const settings = await settingsService.getSettings();
        res.status(200).json(settings);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Atualiza configurações
 * @route   PUT /settings
 */
const updateSettings = async (req, res, next) => {
    try {
        const updated = await settingsService.updateSettings(req.body);
        res.status(200).json({ message: 'Configurações atualizadas.', updated });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtém configuração por chave
 * @route   GET /settings/:key
 */
const getSettingsByKey = async (req, res, next) => {
    const { key } = req.params;
    try {
        const setting = await settingsService.getSettingByKey(key);
        if (!setting) {
            return res.status(404).json({ error: 'Configuração não encontrada.' });
        }
        res.status(200).json(setting);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Deleta configuração por chave
 * @route   DELETE /settings/:key
 */
const deleteSetting = async (req, res, next) => {
    const { key } = req.params;
    try {
        const deleted = await settingsService.deleteSetting(key);
        if (!deleted) {
            return res.status(404).json({ error: 'Configuração não encontrada.' });
        }
        res.status(200).json({ message: 'Configuração deletada com sucesso.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Cria nova configuração
 * @route   POST /settings
 */
const createSetting = async (req, res, next) => {
    const { key, value } = req.body;
    try {
        const newSetting = await settingsService.createSetting(key, value);
        res.status(201).json({ message: 'Configuração criada com sucesso.', setting: newSetting });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtém configurações por categoria
 * @route   GET /settings/category/:category
 */
const getSettingsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const settings = await settingsService.getSettingsByCategory(category);
        res.status(200).json(settings);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSettings,
    updateSettings,
    getSettingsByKey,
    deleteSetting,
    createSetting,
    getSettingsByCategory
};
