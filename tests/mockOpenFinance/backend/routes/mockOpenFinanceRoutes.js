// Importa o framework Express
const express = require('express');

// Cria um objeto router para definir rotas separadas e organizadas
const router = express.Router();

// Importa o controlador com as funções que processam as requisições para as rotas
const mockOpenFinanceController = require('../controllers/mockOpenFinanceController');

// Define uma rota POST em '/auth/token' que chama a função authToken do controlador
router.post('/auth/token', mockOpenFinanceController.authToken);

// Define uma rota GET em '/accounts' que chama a função getAccounts para retornar contas
router.get('/accounts', mockOpenFinanceController.getAccounts);

// Define uma rota GET em '/transactions' que chama a função getTransactions para listar transações
router.get('/transactions', mockOpenFinanceController.getTransactions);

// Define uma rota GET em '/balances' que chama a função getBalances para retornar saldos
router.get('/balances', mockOpenFinanceController.getBalances);

// Define uma rota GET em '/budgets' que chama a função getBudgets para retornar orçamentos
router.get('/budgets', mockOpenFinanceController.getBudgets);

// Define uma rota GET em '/reports' que chama a função getReports para retornar relatórios
router.get('/reports', mockOpenFinanceController.getReports);

// Define uma rota GET em '/cohabitation/expenses' que chama a função getCohabitationExpenses para despesas conjuntas
router.get('/cohabitation/expenses', mockOpenFinanceController.getCohabitationExpenses);

// Exporta o router para ser usado no arquivo principal da aplicação
module.exports = router;
