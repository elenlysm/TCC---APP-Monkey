require('dotenv').config({ path: '../.env' });

// Importa dependências essenciais
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');
const helmet = require('helmet');
const winston = require('winston');

const app = express();

//Configuração de CORS — restringe as origens permitidas
const allowedOrigins = [process.env.FRONTEND_URL || 'http://192.168.56.1:8081'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); //Permite requisições sem origem (ex.: Postman)
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS'));
        }
    },
};

//Aplica o middleware de CORS
app.use(cors(corsOptions));
app.use(helmet());

//Middlewares para interpretar o corpo das requisições
app.use(bodyParser.json()); //JSON
app.use(bodyParser.urlencoded({ extended: true })); //Formulários

//=== ROTAS ===

//Autenticação
app.use('/auth', require('./routes/authRoutes'));

//Transações financeiras
app.use('/transactions', require('./routes/transactionsRoutes'));

//Orçamentos
const budgetsRoutes = require('./routes/budgetsRoutes');
app.use('/api/budgets', budgetsRoutes);

//Usuários
app.use('/users', require('./routes/usersRoutes'));

//Compartilhamento e convivência
app.use('/cohabitation', require('./routes/cohabitationRoutes'));

//Integração com API mock Open Finance Brasil
app.use('/openFinance', require('./routes/openFinanceRoutes'));

//Notificações
app.use('/notifications', require('./routes/notificationRoutes'));

//Relatórios financeiros
app.use('/reports', require('./routes/reportsRoutes'));

//Outras rotas da API
app.use('/api', require('./routes/api'));

//Rota raiz apenas para teste rápido
app.get('/', (req, res) => {
    res.send('Servidor rodando com CORS restrito!');
});

//=== CONFIGURAÇÕES ===

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
//Middleware de autenticação — deve ser aplicado antes das rotas que requerem autenticação
const authMiddleware = require('./middlewares/authMiddleware');
app.use('/api', authMiddleware);
//Middleware de validação — deve ser aplicado antes das rotas que requerem validação
const validate = require('./middlewares/validate');
app.use('/api', validate);
//Middleware de rate limiting para proteger a API contra abusos
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); //Limite de 100 requisições por 15 minutos

//Limite de taxa para a rota de login
app.use('/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

//Middleware de tratamento global de erros — deve ser sempre o último
const errorHandler = require('./middlewares/errorHandler');

//Middleware de erro (sempre por último)
app.use(errorHandler);

//Define a porta do servidor
const PORT = process.env.PORT || 5000;

//Inicializa o servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

//Configuração do Winston para logs
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
    ]
});
//Middleware de logging
app.use((req, res, next) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        timestamp: new Date().toISOString()
    });
    next();
});
//Middleware de logging para erros
app.use((err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        timestamp: new Date().toISOString()
    });
    next(err); //Passa o erro para o próximo middleware
});
//Middleware de validação de campos
const { validationResult } = require('express-validator');
app.use((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});
//Middleware de tratamento de erros genérico
app.use((err, req, res, next) => {
    // Responde com erro genérico
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado',
        timestamp: new Date().toISOString()
    });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);


module.exports = app;