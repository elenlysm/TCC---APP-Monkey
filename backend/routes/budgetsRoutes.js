const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, controller.addBudget);
router.get('/', authMiddleware, controller.getBudgets);

module.exports = router;

