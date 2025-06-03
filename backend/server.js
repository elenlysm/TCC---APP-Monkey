const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const reportsRoutes = require('./routes/reportsRoutes');
app.use('/reports', reportsRoutes);


const authRoutes = require('./authRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const budgetsRoutes = require('./routes/budgetsRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/budgets', budgetsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
const usersRoutes = require('./routes/usersRoutes');
const cohabitationRoutes = require('./routes/cohabitationRoutes');

app.use('/users', usersRoutes);
app.use('/cohabitation', cohabitationRoutes);
const openFinanceRoutes = require('./routes/openFinanceRoutes');

app.use('/openfinance', openFinanceRoutes);
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/notifications', notificationRoutes);
