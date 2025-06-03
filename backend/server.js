// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./authRoutes');
const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/private', authMiddleware, (req, res) => {
    res.json({ message: `Olá, ${req.user.email}. Você está autenticado!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Rotas de exemplo
app.get('/', (req, res) => {
    res.json({ message: 'API rodando com sucesso' });
});

// Rota de saúde
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Simulação de autenticação (exemplo)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Aqui você pode simular uma autenticação
    if (email === 'test@example.com' && password === '123456') {
        res.json({ token: 'fake-jwt-token', user: { email } });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
