//Importa o framework Express
const express = require('express');
const router = express.Router();

//Importa o controller responsável pelos relatórios
const controller = require('../controllers/reportsController');
//Importa o middleware de validação
const validate = require('../middlewares/validate');
//Importa os schemas de validação
const { monthlyReportSchema, categorySummarySchema } = require('../validators/reportsValidator');

/**
 * @route   GET /reports/monthly
 * @desc    Retorna o relatório mensal do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/monthly', validate(monthlyReportSchema, 'query'), controller.getMonthlyReport);

/**
 * @route   GET /reports/category-summary
 * @desc    Retorna o resumo de gastos por categoria do usuário autenticado
 * @access  Privado (requer autenticação)
 */
router.get('/category-summary', validate(categorySummarySchema, 'query'), controller.getCategorySummary);

//Exporta o roteador para ser usado em outros arquivos
module.exports = router;
