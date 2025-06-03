const express = require('express');
const router = express.Router();
const controller = require('../controllers/openFinanceController');
const authMiddleware = require('../authMiddleware');

router.post('/authorize', authMiddleware, controller.handleAuthorization);
router.post('/collect', authMiddleware, controller.collectStatements);

module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../controllers/openFinanceController');
const authMiddleware = require('../authMiddleware');

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
