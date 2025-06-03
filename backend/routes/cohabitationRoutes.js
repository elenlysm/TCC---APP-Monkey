const express = require('express');
const router = express.Router();
const controller = require('../controllers/cohabitationController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, controller.addCohabitation);
router.get('/', authMiddleware, controller.getCohabitations);
router.put('/:id', authMiddleware, controller.updateCohabitation);
router.delete('/:id', authMiddleware, controller.deleteCohabitation);

module.exports = router;
