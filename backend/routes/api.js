const express = require('express');
const router = express.Router();

// Exemplo de rota GET
router.get('/status', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

// Exemplo de rota POST
router.post('/dados', (req, res) => {
    const dados = req.body;
    res.json({ recebido: dados });
});

module.exports = router;
