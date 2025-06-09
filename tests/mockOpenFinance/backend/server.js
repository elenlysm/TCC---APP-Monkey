// Importa o framework Express para criar o servidor web
const express = require('express');

// Cria uma instância da aplicação Express
const app = express();

// Importa as rotas definidas no arquivo './routes/mockOpenFinanceRoutes'
const mockRoutes = require('./routes/mockOpenFinanceRoutes');

// Middleware que permite o Express interpretar requisições com corpo JSON
app.use(express.json());

// Registra o conjunto de rotas 'mockRoutes' para responder às requisições que começarem com '/api'
app.use('/api', mockRoutes);

// Define a porta que o servidor vai escutar, pegando do ambiente ou padrão 4000
const PORT = process.env.PORT || 4000;

// Inicia o servidor na porta definida e exibe uma mensagem no console indicando que está rodando
app.listen(PORT, () => console.log(`Mock Open Finance API running on port ${PORT}`));
