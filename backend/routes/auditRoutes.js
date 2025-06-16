// filepath: backend/routes/auditRoutes.js
const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const validate = require('../middlewares/validate');
const { dateSchema } = require('../validators/joiValidator');

// Exemplo de rota usando Joi para validação de query params:
router.get('/logs/date', validate(dateSchema, 'query'), auditController.getLogsByDate);

// Outras rotas...
module.exports = router;