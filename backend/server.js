// Importa dependências essenciais
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const winston = require('winston');

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
app.use(helmet());

// Middlewares para interpretar o corpo das requisições
app.use(bodyParser.json()); // JSON
app.use(bodyParser.urlencoded({ extended: true })); // Formulários

// === ROTAS ===

// Autenticação
app.use('/auth', require('./routes/authRoutes'));

// Transações financeiras
app.use('/transactions', require('./routes/transactionsRoutes'));

// Orçamentos
const budgetsRoutes = require('./routes/budgetsRoutes');
app.use('/api/budgets', budgetsRoutes);

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

// Configuração do Swagger para documentação da API
const swaggerSpec = swaggerJsdoc({ /* config */ });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Limite de taxa para a rota de login
app.use('/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

// Middleware de tratamento global de erros — deve ser sempre o último
const errorHandler = require('./middlewares/errorHandler');

// Middleware de erro (sempre por último)
app.use(errorHandler);

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Inicializa o servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

const logger = winston.createLogger({ /* config */ });
logger.info('Mensagem de log');

module.exports = app;