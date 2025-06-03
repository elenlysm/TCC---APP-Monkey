const express = require('express');
const router = express.Router();

const controller = require('../controllers/openFinanceController');
const authMiddleware = require('../middlewares/authMiddleware');

const validate = require('../middlewares/validate');
const schema = require('../validators/openFinanceValidator');

router.post(
    '/authorize',
    authMiddleware,
    validate(schema.authorizeSchema),
    controller.handleAuthorization
);

router.post(
    '/collect',
    authMiddleware,
    validate(schema.collectSchema),
    controller.collectStatements
);

module.exports = router;
