// Importa o framework Express
const express = require('express');
// Cria um novo roteador do Express
const router = express.Router();

// Importa o controller responsável pelos relatórios
const controller = require('../controllers/reportsController');
// Importa o middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @route   GET /reports/monthly
 * @desc    Retorna o relatório mensal do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/monthly', authMiddleware, controller.getMonthlyReport);

/**
 * @route   GET /reports/category
 * @desc    Retorna o resumo de gastos por categoria do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/category', authMiddleware, controller.getCategorySummary);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
