const router = require('express').Router();

// Importa os módulos de rotas
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
// Adicione aqui novas rotas conforme o projeto cresce
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
// Exporta o router para ser usado no servidor principal
// Isso permite que o servidor principal importe e use essas rotas
// e organize melhor o código, separando as rotas em arquivos distintos.
// Isso facilita a manutenção e a escalabilidade do projeto, permitindo que novas rotas sejam adicionadas facilmente.
// O router é um objeto do Express que permite definir rotas de forma modular e organizada.
// Ele pode ser usado para agrupar rotas relacionadas, como autenticação, usuários, configurações, etc.
// O uso de módulos separados para cada conjunto de rotas ajuda a manter o código limpo e fácil de entender.
// Além disso, o middleware de log opcional pode ser útil para depuração e monitoramento, registrando cada requisição recebida pelo servidor.