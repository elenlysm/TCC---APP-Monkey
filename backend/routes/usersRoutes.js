const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, controller.addUser);
router.get('/', authMiddleware, controller.getUsers);
router.put('/:id', authMiddleware, controller.updateUser);
router.delete('/:id', authMiddleware, controller.deleteUser);

module.exports = router;

