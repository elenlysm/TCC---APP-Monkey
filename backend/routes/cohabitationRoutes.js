// Importa o framework Express
const express = require('express');
// Cria um novo roteador do Express
const router = express.Router();
// Importa o controller responsável pelas operações de coabitação
const controller = require('../controllers/cohabitationController');
// Importa o middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

// Rota para adicionar uma nova coabitação (POST /)
router.post('/', authMiddleware, controller.addCohabitation);

// Rota para obter todas as coabitações (GET /)
router.get('/', authMiddleware, controller.getCohabitations);

// Rota para atualizar uma coabitação pelo ID (PUT /:id)
router.put('/:id', authMiddleware, controller.updateCohabitation);

// Rota para deletar uma coabitação pelo ID (DELETE /:id)
router.delete('/:id', authMiddleware, controller.deleteCohabitation);

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
