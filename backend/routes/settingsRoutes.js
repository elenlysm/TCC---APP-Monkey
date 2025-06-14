// Importa o roteador do Express
const express = require('express');
const router = express.Router();
// Importa os controllers responsáveis pelas configurações
const controller = require('../controllers/settingsController');
// Importa o middleware de validação
const validate = require('../middlewares/validate');
// Importa os schemas de validação
const { createSettingSchema, updateSettingsSchema } = require('../validators/settingsValidator');

/**
 * @route   GET /settings
 * @desc    Retorna as configurações do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/', authMiddleware, getSettings);

/**
 * @route   POST /settings
 * @desc    Cria uma nova configuração para o usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.post('/', authMiddleware, validate(createSettingSchema, 'body'), controller.createSetting);

/**
 * @route   PUT /settings
 * @desc    Atualiza as configurações do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.put('/', authMiddleware, validate(updateSettingsSchema, 'body'), controller.updateSettings);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
