const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsController');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const { createSettingSchema, updateSettingsSchema } = require('../validators/settingsValidator');

/**
 * @route   GET /settings
 * @desc    Retorna as configurações do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/', authMiddleware, controller.getSettings);

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

//Exporta o roteador para ser usado em outros arquivos
module.exports = router;
