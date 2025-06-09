module.exports = {
    // Lista simulada de contas bancárias
    accounts: [
        {
            id: 1,               // Identificador único da conta
            bank: 'Banco Mock',  // Nome do banco fictício
            type: 'Conta Corrente', // Tipo da conta (corrente, poupança etc.)
            number: '1234-5'     // Número da conta
        }
    ],

    // Lista simulada de transações financeiras
    transactions: [
        {
            id: 1,                  // Identificador único da transação
            description: 'Supermercado', // Descrição da transação
            amount: -150.75,         // Valor da transação (negativo indica despesa)
            category: 'Alimentação', // Categoria da despesa
            date: '2025-05-31'       // Data da transação
        }
    ],

    // Lista simulada de saldos por conta
    balances: [
        {
            accountId: 1,            // Relaciona o saldo à conta com id 1
            balance: 2500.00         // Valor disponível na conta
        }
    ],

    // Lista simulada de orçamentos por categoria
    budgets: [
        {
            category: 'Alimentação', // Categoria do orçamento
            limit: 1000,             // Limite máximo estabelecido para gastar
            spent: 150.75            // Quanto já foi gasto nesta categoria
        }
    ],

    // Lista simulada de relatórios financeiros mensais
    reports: [
        {
            month: 'Maio',            // Mês do relatório
            totalSpent: 1500.00,      // Total gasto no mês
            categories: {             // Detalhamento por categoria
                Alimentação: 500,
                Transporte: 300
            }
        }
    ],

    // Lista simulada de despesas compartilhadas (ex: moradia conjunta)
    cohabitationExpenses: [
        {
            description: 'Internet',     // Descrição da despesa compartilhada
            amount: 120.00,              // Valor total da despesa
            sharedWith: ['user1', 'user2'] // Lista de usuários com quem a despesa é compartilhada
        }
    ]
};
// Exemplo de token de autenticação simulado
module.exports.authToken = {
    access_token: 'mock_access_token_1234567890', // Token de acesso simulado
    token_type: 'Bearer', // Tipo do token
    expires_in: 3600, // Tempo de expiração em segundos
    scope: 'read write' // Escopo de permissões do token
};
// Exemplo de dados de autenticação simulados  