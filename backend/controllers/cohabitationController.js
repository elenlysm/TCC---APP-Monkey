const firestoreService = require('../services/firestoreService');
const COLLECTION = 'cohabitation';

// Função utilitária para validar datas no formato YYYY-MM-DD
const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

// Função auxiliar para verificar se o usuário é Admin na coabitação
const isAdmin = (cohabitation, userId) => {
    return cohabitation.responsibilities?.[userId] === 'Admin';
};

/**
 * @desc    Adiciona nova coabitação
 * @route   POST /cohabitation
 * @access  Privado
 */
const addCohabitation = async (req, res, next) => {
    try {
        // Evita duplicidade do criador no array members
        const membersSet = new Set([req.user.id, ...(req.body.members || [])]);

        const newCohabitation = {
            ...req.body,
            members: Array.from(membersSet),
            responsibilities: {
                // O criador sempre é Admin por padrão
                [req.user.id]: 'Admin',
                ...(req.body.responsibilities || {})
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Adiciona a coabitação no banco
        const id = await firestoreService.addDocument(COLLECTION, newCohabitation);
        res.status(201).json({ message: 'Coabitação adicionada', id });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações do usuário logado
 * @route   GET /cohabitation
 * @access  Privado
 */
const getCohabitations = async (req, res, next) => {
    try {
        // Busca coabitações onde o usuário é membro
        const cohabitations = await firestoreService.getDocumentsByArrayContains(COLLECTION, 'members', req.user.id);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Busca coabitação específica pelo ID
 * @route   GET /cohabitation/:id
 * @access  Privado
 */
const getCohabitationById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }
        // Verifica se o usuário pertence a essa coabitação
        if (!cohabitation.members.includes(req.user.id)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        res.status(200).json(cohabitation);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Atualiza coabitação (dados gerais)
 * @route   PUT /cohabitation/:id
 * @access  Privado (apenas Admin)
 */
const updateCohabitation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

        // Só Admin pode atualizar
        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        // Atualiza dados e campo updatedAt
        const updatedCohabitation = {
            ...cohabitation,
            ...req.body,
            updatedAt: new Date().toISOString(),
        };

        await firestoreService.updateDocument(COLLECTION, id, updatedCohabitation);
        res.status(200).json({ message: 'Coabitação atualizada' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Deleta coabitação
 * @route   DELETE /cohabitation/:id
 * @access  Privado (apenas Admin)
 */
const deleteCohabitation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

        // Só Admin pode deletar
        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Coabitação deletada' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Adiciona membro à coabitação (só Admin)
 * @route   POST /cohabitation/:id/member
 */
const addMember = async (req, res, next) => {
    const { id } = req.params;
    const { memberId, role } = req.body;

    // Validação dos campos obrigatórios
    if (!memberId || !role) {
        return res.status(400).json({ message: 'memberId e role são obrigatórios' });
    }

    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

        // Só Admin pode adicionar membros
        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        // Impede duplicidade de membros
        if (cohabitation.members.includes(memberId)) {
            return res.status(400).json({ message: 'Membro já faz parte da coabitação' });
        }

        cohabitation.members.push(memberId);

        // Atualiza responsabilidades
        cohabitation.responsibilities = {
            ...cohabitation.responsibilities,
            [memberId]: role
        };

        cohabitation.updatedAt = new Date().toISOString();

        await firestoreService.updateDocument(COLLECTION, id, cohabitation);
        res.status(200).json({ message: 'Membro adicionado com sucesso' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Remove membro da coabitação (só Admin)
 * @route   DELETE /cohabitation/:id/member
 */
const removeMember = async (req, res, next) => {
    const { id } = req.params;
    const { memberId } = req.body;

    if (!memberId) {
        return res.status(400).json({ message: 'memberId é obrigatório' });
    }

    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

        // Só Admin pode remover membros
        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        // Impede remoção do último admin
        if (
            cohabitation.responsibilities[memberId] === 'Admin' &&
            Object.values(cohabitation.responsibilities).filter(role => role === 'Admin').length === 1
        ) {
            return res.status(400).json({ message: 'Não é possível remover o último admin da coabitação.' });
        }

        cohabitation.members = cohabitation.members.filter(m => m !== memberId);

        if (cohabitation.responsibilities) {
            delete cohabitation.responsibilities[memberId];
        }

        cohabitation.updatedAt = new Date().toISOString();

        await firestoreService.updateDocument(COLLECTION, id, cohabitation);
        res.status(200).json({ message: 'Membro removido com sucesso' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Atualiza responsabilidade de um membro (só Admin)
 * @route   PUT /cohabitation/:id/responsibility
 */
const updateResponsibility = async (req, res, next) => {
    const { id } = req.params;
    const { memberId, role } = req.body;

    if (!memberId || !role) {
        return res.status(400).json({ message: 'memberId e role são obrigatórios' });
    }

    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

        // Só Admin pode atualizar responsabilidades
        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        if (!cohabitation.members.includes(memberId)) {
            return res.status(400).json({ message: 'Membro não pertence a essa coabitação' });
        }

        cohabitation.responsibilities = {
            ...cohabitation.responsibilities,
            [memberId]: role
        };

        cohabitation.updatedAt = new Date().toISOString();

        await firestoreService.updateDocument(COLLECTION, id, cohabitation);
        res.status(200).json({ message: 'Responsabilidade atualizada com sucesso' });
    } catch (error) {
        next(error);
    }
};

// ===== ROTAS DE FILTROS DIVERSOS =====

/**
 * @desc    Lista coabitações por membro
 * @route   GET /cohabitation/member/:memberId
 */
const getCohabitationsByMember = async (req, res, next) => {
    const { memberId } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByArrayContains(COLLECTION, 'members', memberId);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por categoria
 * @route   GET /cohabitation/category/:category
 */
const getCohabitationsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por data de criação
 * @route   GET /cohabitation/createdAt/:date
 */
const getCohabitationsByCreationDate = async (req, res, next) => {
    const { date } = req.params;
    // Validação de formato de data
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' });
    }
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'createdAt', date);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por status
 * @route   GET /cohabitation/status/:status
 */
const getCohabitationsByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por período de criação
 * @route   GET /cohabitation/period/:startDate/:endDate
 */
const getCohabitationsByPeriod = async (req, res, next) => {
    const { startDate, endDate } = req.params;
    // Validação de formato de data
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'As datas devem estar no formato YYYY-MM-DD.' });
    }
    try {
        const cohabitations = await firestoreService.getDocumentsByDateRange(COLLECTION, 'createdAt', startDate, endDate);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por prioridade
 * @route   GET /cohabitation/priority/:priority
 */
const getCohabitationsByPriority = async (req, res, next) => {
    const { priority } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por tipo
 * @route   GET /cohabitation/type/:type
 */
const getCohabitationsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por descrição
 * @route   GET /cohabitation/description/:description
 */
const getCohabitationsByDescription = async (req, res, next) => {
    const { description } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'description', description);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por nome
 * @route   GET /cohabitation/name/:name
 */
const getCohabitationsByName = async (req, res, next) => {
    const { name } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'name', name);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Lista coabitações por localização
 * @route   GET /cohabitation/location/:location
 */
const getCohabitationsByLocation = async (req, res, next) => {
    const { location } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'location', location);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Exporta todas as funções do controller para uso nas rotas
module.exports = {
    addCohabitation,
    getCohabitations,
    getCohabitationById,
    updateCohabitation,
    deleteCohabitation,
    addMember,
    removeMember,
    updateResponsibility,
    getCohabitationsByMember,
    getCohabitationsByCategory,
    getCohabitationsByCreationDate,
    getCohabitationsByStatus,
    getCohabitationsByPeriod,
    getCohabitationsByPriority,
    getCohabitationsByType,
    getCohabitationsByDescription,
    getCohabitationsByName,
    getCohabitationsByLocation
};