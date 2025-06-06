// Importa o framework Express
const express = require('express');
// Cria um novo roteador do Express
const router = express.Router();

// Importa o controller responsável pelas operações de Open Finance
const controller = require('../controllers/openFinanceController');
// Importa o middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

// Importa o middleware de validação e o schema de validação
const validate = require('../middlewares/validate');
const schema = require('../validators/openFinanceValidator');

/**
 * @route   POST /open-finance/authorize
 * @desc    Autoriza o usuário a acessar dados do Open Finance
 * @access  Privado (requer autenticação)
 */
router.post(
    '/authorize',
    authMiddleware,
    validate(schema.authorizeSchema),
    controller.handleAuthorization
);

/**
 * @route   POST /open-finance/collect
 * @desc    Coleta extratos bancários do usuário via Open Finance
 * @access  Privado (requer autenticação)
 */
router.post(
    '/collect',
    authMiddleware,
    validate(schema.collectSchema),
    controller.collectStatements
);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
