const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionsController');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const { transactionSchema, updateTransactionSchema, periodSchema } = require('../validators/transactionValidator');

/**
 * @route   POST /transactions
 * @desc    Cria uma nova transação para o usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.post('/', validate(transactionSchema, 'body'), controller.addTransaction);

/**
 * @route   GET /transactions
 * @desc    Lista todas as transações do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/', authMiddleware, controller.getTransactions);

/**
 * @route   PUT /transactions/:id
 * @desc    Atualiza uma transação específica pelo ID
 * @access  Privado (requer autenticação)
 */
router.put('/:id', validate(updateTransactionSchema, 'body'), controller.updateTransaction);

/**
 * @route   DELETE /transactions/:id
 * @desc    Remove uma transação específica pelo ID
 * @access  Privado (requer autenticação)
 */
router.delete('/:id', authMiddleware, controller.deleteTransaction);

/**
 * @route   GET /transactions/period
 * @desc    Busca transações por período
 * @access  Privado (requer autenticação)
 */
router.get('/period', validate(periodSchema, 'query'), controller.getTransactionsByPeriod);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
