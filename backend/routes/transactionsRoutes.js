const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, controller.addTransaction);
router.get('/', authMiddleware, controller.getTransactions);
router.put('/:id', authMiddleware, controller.updateTransaction);
router.delete('/:id', authMiddleware, controller.deleteTransaction);

module.exports = router;
