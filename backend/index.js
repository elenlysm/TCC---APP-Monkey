const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configura a porta
const port = process.env.PORT || 3000;

// Configurar CORS para permitir só o frontend específico
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:19006']; // exemplo: Expo padrão

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // permitir requisições sem origem (ex: Postman)
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS'));
        }
    },
};

app.use(cors(corsOptions));

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para interpretar dados urlencoded (formulários)
app.use(express.urlencoded({ extended: true }));

// Importar rotas de outro arquivo
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
    res.send('Servidor rodando com CORS restrito!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
