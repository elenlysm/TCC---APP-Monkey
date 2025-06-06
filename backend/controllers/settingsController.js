const settingsService = require('../services/settingsService');

/**
 * @desc    Obtém todas as configurações
 * @route   GET /settings
 */
const getSettings = async (req, res) => {
    try {
        const settings = await settingsService.getSettings();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Erro ao obter configurações:', error);
        res.status(500).json({ error: 'Falha ao obter configurações.' });
    }
};

/**
 * @desc    Atualiza configurações
 * @route   PUT /settings
 */
const updateSettings = async (req, res) => {
    try {
        const updated = await settingsService.updateSettings(req.body);
        res.status(200).json({ message: 'Configurações atualizadas.', updated });
    } catch (error) {
        console.error('Erro ao atualizar configurações:', error);
        res.status(500).json({ error: 'Falha ao atualizar configurações.' });
    }
};

/**
 * @desc    Obtém configuração por chave
 * @route   GET /settings/:key
 */
const getSettingsByKey = async (req, res) => {
    const { key } = req.params;

    if (!key) {
        return res.status(400).json({ error: 'Chave é obrigatória.' });
    }

    try {
        const setting = await settingsService.getSettingByKey(key);
        if (!setting) {
            return res.status(404).json({ error: 'Configuração não encontrada.' });
        }
        res.status(200).json(setting);
    } catch (error) {
        console.error(`Erro ao obter configuração por chave ${key}:`, error);
        res.status(500).json({ error: 'Falha ao obter configuração por chave.' });
    }
};

/**
 * @desc    Deleta configuração por chave
 * @route   DELETE /settings/:key
 */
const deleteSetting = async (req, res) => {
    const { key } = req.params;

    if (!key) {
        return res.status(400).json({ error: 'Chave é obrigatória.' });
    }

    try {
        const deleted = await settingsService.deleteSetting(key);
        if (!deleted) {
            return res.status(404).json({ error: 'Configuração não encontrada.' });
        }
        res.status(200).json({ message: 'Configuração deletada com sucesso.' });
    } catch (error) {
        console.error(`Erro ao deletar configuração por chave ${key}:`, error);
        res.status(500).json({ error: 'Falha ao deletar configuração.' });
    }
};

/**
 * @desc    Cria nova configuração
 * @route   POST /settings
 */
const createSetting = async (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).json({ error: 'Chave e valor são obrigatórios.' });
    }

    try {
        const newSetting = await settingsService.createSetting(key, value);
        res.status(201).json({ message: 'Configuração criada com sucesso.', setting: newSetting });
    } catch (error) {
        console.error('Erro ao criar configuração:', error);
        res.status(500).json({ error: 'Falha ao criar configuração.' });
    }
};

/**
 * @desc    Obtém configurações por categoria
 * @route   GET /settings/category/:category
 */
const getSettingsByCategory = async (req, res) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ error: 'Categoria é obrigatória.' });
    }

    try {
        const settings = await settingsService.getSettingsByCategory(category);
        res.status(200).json(settings);
    } catch (error) {
        console.error(`Erro ao obter configurações por categoria ${category}:`, error);
        res.status(500).json({ error: 'Falha ao obter configurações por categoria.' });
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
