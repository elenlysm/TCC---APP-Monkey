const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { healthCheckSchema } = require('../validators/healthValidator');

/**
 * @route   GET /health
 * @desc    Verifica a saúde do sistema
 * @access  Público
 */
router.get('/', validate(healthCheckSchema, 'query'), controller.healthCheck);  

/**
 * @route   GET /health/status
 * @desc    Verifica o status do sistema (requer autenticação)
 * @access  Privado
 */
router.get('/status', authMiddleware, controller.statusCheck);
/**
 * @route   GET /health/uptime
 * @desc    Verifica o tempo de atividade do sistema (requer autenticação)
 * @access  Privado
 */
router.get('/uptime', authMiddleware, controller.uptimeCheck);
/**
 * @route   GET /health/database
 * @desc    Verifica a conexão com o banco de dados (requer autenticação)
 * @access  Privado
 */
router.get('/database', authMiddleware, controller.databaseCheck);
/**
 * @route   GET /health/cache
 * @desc    Verifica o status do cache (requer autenticação)
 * @access  Privado
 */
router.get('/cache', authMiddleware, controller.cacheCheck);
/**
 * @route   GET /health/queue
 * @desc    Verifica o status da fila de tarefas (requer autenticação)
 * @access  Privado
 */
router.get('/queue', authMiddleware, controller.queueCheck);
/**
 * @route   GET /health/services
 * @desc    Verifica o status de serviços externos (requer autenticação)
 * @access  Privado
 */
router.get('/services', authMiddleware, controller.servicesCheck);
/**
 * @route   GET /health/latency
 * @desc    Verifica a latência do sistema (requer autenticação)
 * @access  Privado
 */
router.get('/latency', authMiddleware, controller.latencyCheck);
/**
 * @route   GET /health/performance
 * @desc    Verifica o desempenho do sistema (requer autenticação)
 * @access  Privado
 */
router.get('/performance', authMiddleware, controller.performanceCheck);
/**
 * @route   GET /health/metrics
 * @desc    Coleta métricas de desempenho do sistema (requer autenticação)
 * @access  Privado
 */
router.get('/metrics', authMiddleware, controller.metricsCheck);

//Exporta o roteador para ser usado em outros arquivos
module.exports = router;