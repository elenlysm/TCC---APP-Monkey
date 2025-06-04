const firestoreService = require('../services/firestoreService');
const COLLECTION = 'cohabitation';

// Função auxiliar para verificar se o usuário é Admin na coabitação
const isAdmin = (cohabitation, userId) => {
    return cohabitation.responsibilities?.[userId] === 'Admin';
};

//  Adiciona nova coabitação
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

        const id = await firestoreService.addDocument(COLLECTION, newCohabitation);
        res.status(201).json({ message: 'Coabitação adicionada', id });
    } catch (error) {
        next(error);
    }
};

// @desc    Lista coabitações do usuário logado
// @route   GET /cohabitation
// @access  Privado
const getCohabitations = async (req, res, next) => {
    try {
        const cohabitations = await firestoreService.getDocumentsByArrayContains(COLLECTION, 'members', req.user.id);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// @desc    Busca coabitação específica pelo ID
// @route   GET /cohabitation/:id
// @access  Privado
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

// Atualiza coabitação (dados gerais)
// Só membro admin pode alterar
const updateCohabitation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

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

// Deleta coabitação (só Admin)
// Só membro admin pode deletar
const deleteCohabitation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cohabitation = await firestoreService.getDocumentById(COLLECTION, id);
        if (!cohabitation) {
            return res.status(404).json({ message: 'Coabitação não encontrada' });
        }

        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Coabitação deletada' });
    } catch (error) {
        next(error);
    }
};

// Adiciona membro (só Admin)
const addMember = async (req, res, next) => {
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

        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
        }

        // Adiciona membro se não existir
        if (!cohabitation.members.includes(memberId)) {
            cohabitation.members.push(memberId);
        }

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

//  Remove membro (só Admin)
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

        if (!isAdmin(cohabitation, req.user.id)) {
            return res.status(403).json({ message: 'Permissão negada' });
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

//  Atualiza responsabilidade (só Admin)
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
// Exemplos de rotas para busca filtrada (verifique se precisam de autenticação / autorização)

// Por membro (ex: admin pode ver membros específicos)
const getCohabitationsByMember = async (req, res, next) => {
    const { memberId } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByArrayContains(COLLECTION, 'members', memberId);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por categoria
const getCohabitationsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por data de criação (ISO string esperada)
const getCohabitationsByCreationDate = async (req, res, next) => {
    const { date } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'createdAt', date);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por status
const getCohabitationsByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por período (datas ISO strings esperadas)
const getCohabitationsByPeriod = async (req, res, next) => {
    const { startDate, endDate } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByDateRange(COLLECTION, 'createdAt', startDate, endDate);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por prioridade
const getCohabitationsByPriority = async (req, res, next) => {
    const { priority } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por tipo
const getCohabitationsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por descrição
const getCohabitationsByDescription = async (req, res, next) => {
    const { description } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'description', description);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por nome
const getCohabitationsByName = async (req, res, next) => {
    const { name } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'name', name);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

// Por localização
const getCohabitationsByLocation = async (req, res, next) => {
    const { location } = req.params;
    try {
        const cohabitations = await firestoreService.getDocumentsByField(COLLECTION, 'location', location);
        res.status(200).json(cohabitations);
    } catch (error) {
        next(error);
    }
};

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