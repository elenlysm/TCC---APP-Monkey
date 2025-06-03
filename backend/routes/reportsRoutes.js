const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportsController');
const authMiddleware = require('../authMiddleware');

router.get('/monthly', authMiddleware, controller.getMonthlyReport);
router.get('/category', authMiddleware, controller.getCategorySummary);

module.exports = router;
