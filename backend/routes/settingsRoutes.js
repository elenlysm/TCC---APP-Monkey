// Importa o roteador do Express
const router = require('express').Router();
// Importa os controllers responsáveis pelas configurações
const { getSettings, updateSettings } = require('../controllers/settingsController');
// Importa o middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @route   GET /settings
 * @desc    Retorna as configurações do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/', authMiddleware, getSettings);

/**
 * @route   PUT /settings
 * @desc    Atualiza as configurações do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.put('/', authMiddleware, updateSettings);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
