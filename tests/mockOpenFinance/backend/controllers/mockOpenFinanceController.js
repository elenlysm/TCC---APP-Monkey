// Importa os dados simulados que serão usados para responder as requisições
const mockData = require('../data/mockData');

// Função que simula a geração de um token de autenticação
exports.authToken = (req, res) => {
    // Retorna um JSON com um token fixo, tipo de token e tempo de expiração (em segundos)
    res.json({ access_token: 'mock_access_token', token_type: 'Bearer', expires_in: 3600 });
};

// Função que retorna a lista simulada de contas bancárias
exports.getAccounts = (req, res) => {
    // Envia a lista de contas do mockData como resposta JSON
    res.json(mockData.accounts);
};

// Função que retorna a lista simulada de transações financeiras
exports.getTransactions = (req, res) => {
    res.json(mockData.transactions);
};

// Função que retorna os saldos simulados por conta
exports.getBalances = (req, res) => {
    res.json(mockData.balances);
};

// Função que retorna os orçamentos simulados por categoria
exports.getBudgets = (req, res) => {
    res.json(mockData.budgets);
};

// Função que retorna os relatórios financeiros simulados
exports.getReports = (req, res) => {
    res.json(mockData.reports);
};

// Função que retorna as despesas compartilhadas simuladas
exports.getCohabitationExpenses = (req, res) => {
    res.json(mockData.cohabitationExpenses);
};
