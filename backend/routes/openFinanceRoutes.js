//Importa o framework Express
const express = require('express');
const router = express.Router();

//Importa o controller responsável pelas operações de Open Finance
const controller = require('../controllers/openFinanceController');

//Importa o middleware de validação e o schema de validação
const validate = require('../middlewares/validate');
const { authorizeSchema, collectSchema } = require('../validators/openFinanceValidator');

/**
 * @route   POST /openfinance/authorize
 * @desc    Autoriza o usuário a acessar dados do Open Finance
 * @access  Privado (requer autenticação)
 */
router.post('/authorize', validate(authorizeSchema, 'body'), controller.authorize);

/**
 * @route   POST /openfinance/statements
 * @desc    Coleta extratos bancários do usuário via Open Finance
 * @access  Privado (requer autenticação)
 */
router.post('/statements', validate(collectSchema, 'body'), controller.getStatements);

/**
 * @route   POST /openfinance/transactions
 * @desc    Coleta transações do usuário via Open Finance
 * @access  Privado (requer autenticação)
 */
router.post('/transactions', validate(collectSchema, 'body'), controller.getTransactions);

/**
 * @route   POST /openfinance/budgets
 * @desc    Coleta orçamentos do usuário via Open Finance
 * @access  Privado (requer autenticação)
 */
router.post('/budgets', validate(collectSchema, 'body'), controller.getBudgets);

//Exporta o roteador para ser usado em outros arquivos
module.exports = router;
