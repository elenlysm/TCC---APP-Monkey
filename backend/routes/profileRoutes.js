const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { updateProfileSchema, updatePasswordSchema } = require('../validators/profileValidator');

//Obter perfil (não precisa de validação de body)
router.get('/', authMiddleware, controller.getProfile);

//Atualizar perfil
router.put('/', authMiddleware, validate(updateProfileSchema, 'body'), controller.updateProfile);

//Atualizar senha
router.put('/password', authMiddleware, validate(updatePasswordSchema, 'body'), controller.updatePassword);

module.exports = router;