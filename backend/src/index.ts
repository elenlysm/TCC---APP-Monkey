import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import winston from 'winston';

// @ts-ignore
import authRoutesImport from '../routes/authRoutes';
const authRoutes = authRoutesImport.default || authRoutesImport;
// @ts-ignore
import usersRoutesImport from '../routes/usersRoutes';
const usersRoutes = usersRoutesImport.default || usersRoutesImport;
// @ts-ignore
import transactionsRoutesImport from '../routes/transactionsRoutes';
const transactionsRoutes = transactionsRoutesImport.default || transactionsRoutesImport;
// @ts-ignore
import budgetsRoutesImport from '../routes/budgetsRoutes';
const budgetsRoutes = budgetsRoutesImport.default || budgetsRoutesImport;
// @ts-ignore
import cohabitationRoutesImport from '../routes/cohabitationRoutes';
const cohabitationRoutes = cohabitationRoutesImport.default || cohabitationRoutesImport;
// @ts-ignore
import openFinanceRoutesImport from '../routes/openFinanceRoutes';
const openFinanceRoutes = openFinanceRoutesImport.default || openFinanceRoutesImport;
// @ts-ignore
import notificationRoutesImport from '../routes/notificationRoutes';
const notificationRoutes = notificationRoutesImport.default || notificationRoutesImport;
// @ts-ignore
import reportsRoutesImport from '../routes/reportsRoutes';
const reportsRoutes = reportsRoutesImport.default || reportsRoutesImport;
// @ts-ignore
import apiRoutesImport from '../routes/api';
const apiRoutes = apiRoutesImport.default || apiRoutesImport;

// Configurações iniciais
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Limite de requisições
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
}));

// Rotas
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/budgets', budgetsRoutes);
app.use('/cohabitation', cohabitationRoutes);
app.use('/openfinance', openFinanceRoutes);
app.use('/notifications', notificationRoutes);
app.use('/reports', reportsRoutes);
app.use('/api', apiRoutes);

// Rota raiz
app.get('/', (_req, res) => {
    res.send('Servidor rodando!');
});

// Middleware de erro global
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    winston.error(err.stack || err.message);
    res.status(500).json({ error: 'Erro interno do servidor.' });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});