const express = require('express');
const router = express.Router();
// Importa o controller responsável pelas operações de coabitação
const controller = require('../controllers/cohabitationController');
// Importa o middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');
// Importa o middleware de validação
const validate = require('../middlewares/validate');
// Importa os esquemas de validação
const {
    cohabitationSchema,
    updateCohabitationSchema,
    memberSchema,
    removeMemberSchema,
    responsibilitySchema
} = require('../validators/cohabitationValidator');

/**
 * Rotas principais de coabitação
 */

// Rota para adicionar uma nova coabitação (POST /)
router.post(
    '/',
    authMiddleware,
    validate(cohabitationSchema, 'body'),
    controller.addCohabitation
);

// Rota para obter todas as coabitações do usuário autenticado (GET /)
router.get('/', authMiddleware, controller.getCohabitations);

// Rota para obter uma coabitação específica pelo ID (GET /:id)
router.get('/:id', authMiddleware, controller.getCohabitationById);

// Rota para atualizar uma coabitação pelo ID (PUT /:id)
router.put(
    '/:id',
    authMiddleware,
    validate(updateCohabitationSchema, 'body'),
    controller.updateCohabitation
);

// Rota para deletar uma coabitação pelo ID (DELETE /:id)
router.delete('/:id', authMiddleware, controller.deleteCohabitation);

/**
 * Rotas para gerenciamento de membros e responsabilidades
 */

// Adiciona membro à coabitação
router.post(
    '/:id/member',
    authMiddleware,
    validate(memberSchema, 'body'),
    controller.addMember
);

// Remove membro da coabitação
router.delete(
    '/:id/member',
    authMiddleware,
    validate(removeMemberSchema, 'body'),
    controller.removeMember
);

// Atualiza responsabilidade de membro
router.put(
    '/:id/responsibility',
    authMiddleware,
    validate(responsibilitySchema, 'body'),
    controller.updateResponsibility
);

/**
 * Rotas de filtros e buscas
 */

// Busca coabitações por categoria
router.get('/category/:category', authMiddleware, controller.getCohabitationsByCategory);

// Busca coabitações por status
router.get('/status/:status', authMiddleware, controller.getCohabitationsByStatus);

// Busca coabitações por período (exemplo: ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD)
router.get('/period', authMiddleware, controller.getCohabitationsByPeriod);

// Busca coabitações por prioridade
router.get('/priority/:priority', authMiddleware, controller.getCohabitationsByPriority);

// Busca coabitações por tipo
router.get('/type/:type', authMiddleware, controller.getCohabitationsByType);

// Busca coabitações por descrição
router.get('/description/:description', authMiddleware, controller.getCohabitationsByDescription);

// Busca coabitações por nome
router.get('/name/:name', authMiddleware, controller.getCohabitationsByName);

// Busca coabitações por localização
router.get('/location/:location', authMiddleware, controller.getCohabitationsByLocation);

// Busca coabitações por membro
router.get('/member/:memberId', authMiddleware, controller.getCohabitationsByMember);

// Busca coabitações por data de criação
router.get('/createdAt/:date', authMiddleware, controller.getCohabitationsByCreationDate);

/**
 * Exporta o roteador para ser usado em outros arquivos
 */
module.exports = router;
