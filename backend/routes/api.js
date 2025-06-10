const router = require('express').Router();

// Importa os módulos de rotas
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const settingsRoutes = require('./settingsRoutes');
const openFinanceRoutes = require('./openFinanceRoutes');
const healthRoutes = require('./healthRoutes');

// Middleware simples para logar requisições (opcional)
router.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
});

// Define as rotas da API
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/settings', settingsRoutes);
router.use('/openfinance', openFinanceRoutes);
router.use('/health', healthRoutes);

// Rota fallback para endpoint não encontrado
router.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

module.exports = router;