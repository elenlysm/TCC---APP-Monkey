require('dotenv').config({ path: '../.env' });

// Importa dependências essenciais
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

const app = express();

// === Middleware básicos ===

//Configuração de CORS — restringe as origens permitidas
app.use(cors());

// Segurança HTTP headers
app.use(helmet());

//Middlewares para interpretar o corpo das requisições
app.use(bodyParser.json()); //JSON
app.use(bodyParser.urlencoded({ extended: true })); //Formulários

// === Configuração do logger Winston ===

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({ filename: 'logs/combined.log'}),
    ],
    exceptionHandlers:[
        new winston.transports.File({ filename: 'logs/exceptions.log'}),
    ],
    rejectionHandlers:[
        new winston.transports.File({ filename: 'logs/rejections.log'}),
    ],
});

// Middleware de logging básico de requisição

app.use((req,res,next) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
    });
    next();
});

// === Rotas ===

//Autenticação
app.use('/auth', require('./routes/authRoutes'));

// Outras rotas
app.use('/transactions', require('./routes/transactionsRoutes'));
app.use('/api/budgets', require('./routes/budgetsRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/cohabitation', require('./routes/cohabitationRoutes'));
app.use('/openFinance', require('./routes/openFinanceRoutes'));
app.use('/notifications', require('./routes/notificationRoutes'));
app.use('/reports', require('./routes/reportsRoutes'));
app.use('/api', require('./routes/api'));

//Rota raiz apenas para teste rápido
app.get('/', (req, res) => {
    res.send('Servidor rodando com CORS liberado para teste!');
});

//=== CONFIGURAÇÕES Swagger ===

//Configuração do Swagger para documentação da API
const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Financeira',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento financeiro',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:5000/api',
            },
        ],
    },
    apis: ['./routes/*.js'], //Caminho para os arquivos de rotas
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// === Middleware de tratamento de erros ===

// Middleware para logar erros

app.use((err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
    });
    next(err);
});

// Middleware para enviar resposta de erro para o cliente

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Erro interno do servidor',
        timestamp: new Date().toISOString(),
    });
});

// Porta do servidor

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;