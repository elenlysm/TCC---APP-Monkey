// Importa dependências essenciais
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Configuração de CORS — restringe as origens permitidas
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:19006'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Permite requisições sem origem (ex.: Postman)
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS'));
        }
    },
};

// Aplica o middleware de CORS
app.use(cors(corsOptions));

// Middlewares para interpretar o corpo das requisições
app.use(bodyParser.json()); // JSON
app.use(bodyParser.urlencoded({ extended: true })); // Formulários

// === ROTAS ===

// Autenticação
app.use('/auth', require('./routes/authRoutes'));

// Transações financeiras
app.use('/transactions', require('./routes/transactionsRoutes'));

// Orçamentos
app.use('/budgets', require('./routes/budgetsRoutes'));

// Usuários
app.use('/users', require('./routes/usersRoutes'));

// Compartilhamento e convivência
app.use('/cohabitation', require('./routes/cohabitationRoutes'));

// Integração com Open Finance Brasil
app.use('/openfinance', require('./routes/openFinanceRoutes'));

// Notificações
app.use('/notifications', require('./routes/notificationRoutes'));

// Relatórios financeiros
app.use('/reports', require('./routes/reportsRoutes'));

// Outras rotas da API
app.use('/api', require('./routes/api'));

// Rota raiz apenas para teste rápido
app.get('/', (req, res) => {
    res.send('Servidor rodando com CORS restrito!');
});

// Middleware de tratamento global de erros — deve ser sempre o último
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Inicializa o servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
