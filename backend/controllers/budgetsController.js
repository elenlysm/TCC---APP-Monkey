const budgetsValidator = require('../validators/budgetsValidator'); //Importa o validador Joi para orçamentos
const firestoreService = require('../services/firestoreService'); //Importa o serviço responsável pela comunicação com o Firestore
const COLLECTION = 'budgets'; //Define o nome da coleção usada no Firestore para armazenar orçamentos

//Define o nome da coleção usada no Firestore para armazenar orçamentos
const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

/**
 * @desc    Adiciona um novo orçamento
 * @route   POST /budgets
 * @access  Privado
 */
const addBudget = async (req, res, next) => {
    try {
        //Os dados do req.body já foram validados previamente via middleware (Joi)
        const id = await firestoreService.addDocument(COLLECTION, req.body);
        res.status(201).json({ message: 'Orçamento adicionado com sucesso.', id }); //Retorna o ID do novo orçamento criado
    } catch (error) {
        console.error('Erro ao adicionar orçamento:', error);
        next(error); //Encaminha erro para middleware de tratamento
    }
};

/**
 * @desc    Lista todos os orçamentos com paginação
 * @route   GET /budgets?page=1&limit=20
 * @access  Privado
 */
const getBudgets = async (req, res, next) => {
    try {
        //Extrai os parâmetros de paginação da query string, com valores padrão
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        // Recupera os orçamentos paginados via serviço
        const budgets = await firestoreService.getBudgets({ page, limit });
        //Retorna os dados encontrados
        res.status(200).json({ data: budgets, message: 'Orçamentos listados com sucesso.' });
    } catch (error) {
        console.error('Erro ao listar orçamentos:', error);
        next(error);
    }
};

/**
 * @desc    Atualiza um orçamento
 * @route   PUT /budgets/:id
 * @access  Privado
 */
const updateBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.updateDocument(COLLECTION, id, req.body);
        res.status(200).json({ message: 'Orçamento atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar orçamento:', error);
        next(error);
    }
};//Atualiza o documento no Firestore com os novos dados

/**
 * @desc    Deleta um orçamento
 * @route   DELETE /budgets/:id
 * @access  Privado
 */
const deleteBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        await firestoreService.deleteDocument(COLLECTION, id);
        res.status(200).json({ message: 'Orçamento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar orçamento:', error);
        next(error);
    }
}; //Deleta o documento correspondente

/**
 * @desc    Busca um orçamento específico por ID
 * @route   GET /budgets/:id
 * @access  Privado
 */
const getBudgetById = async (req, res, next) => {
    const { id } = req.params;
    try {
        //Recupera o orçamento com base no ID informado
        const budget = await firestoreService.getDocumentById(COLLECTION, id);
        if (!budget) {
            return res.status(404).json({ message: 'Orçamento não encontrado.' });
        } //Se não encontrado, retorna 404
        res.status(200).json(budget); //Retorna o orçamento encontrado
    } catch (error) {
        console.error('Erro ao buscar orçamento por ID:', error);
        next(error);
    }
};

/**
 * @desc Busca orçamentos por data de criação
 * @route GET /budgets/createdAt/:date
 */

const getBudgetsByCreationDate = async (req, res, next) => {
    const { date } = req.params;
    if (!isValidDate(date)){
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' }); //Verifica se a data está no formato correto
    }
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'createdAt', date); //Busca documentos onde 'createdAt' seja igual à data fornecida
        res.status(200).json(budgets); 
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de criação:', error);
        next(error);
    }
}

/**
 * @desc    Lista orçamentos por categoria
 * @route   GET /budgets/category/:category
 */
const getBudgetsByCategory = async (req, res, next) => {
    const { category } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'category', category);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por categoria:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por usuário
 * @route   GET /budgets/user/:userId
 */
const getBudgetsByUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'userId', userId);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por usuário:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por período (intervalo de datas)
 * @route   GET /budgets/period/:startDate/:endDate
 */
const getBudgetsByPeriod = async (req, res, next) => {
    const { startDate, endDate } = req.params;
    // Validação de datas
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'As datas devem estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByDateRange(COLLECTION, 'date', startDate, endDate);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por período:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por status
 * @route   GET /budgets/status/:status
 */
const getBudgetsByStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'status', status);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por status:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por prioridade
 * @route   GET /budgets/priority/:priority
 */
const getBudgetsByPriority = async (req, res, next) => {
    const { priority } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'priority', priority);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por prioridade:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por tipo
 * @route   GET /budgets/type/:type
 */
const getBudgetsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'type', type);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por tipo:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por descrição
 * @route   GET /budgets/description/:description
 */
const getBudgetsByDescription = async (req, res, next) => {
    const { description } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'description', description);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por descrição:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por data de atualização
 * @route   GET /budgets/updatedAt/:date
 */
const getBudgetsByUpdateDate = async (req, res, next) => {
    const { date } = req.params;
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'updatedAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de atualização:', error);
        next(error);
    }
};

/**
 * @desc    Lista orçamentos por usuário e data de criação
 * @route   GET /budgets/user-created-at
 */
const getBudgetsByUserCreatedAt = (req, res) => {
    res.status(501).json({ error: 'Not implemented' });
};

/**
 * @desc    Lista orçamentos por data (YYYY-MM-DD)
 * @route   GET /budgets/date/:date
 */
const getBudgetsByDate = async (req, res, next) => {
    try {
        const { date } = req.params;
        // Validação simples de data
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ error: 'Data inválida. Use o formato YYYY-MM-DD.' });
        }
        // Busca usando o service
        const budgets = await firestoreService.getDocuments(COLLECTION, [['date', '==', date]]);
        res.json(budgets);
    } catch (error) {
        next(error); // Isso envia o erro para o errorHandler
    }
};

/**
 * @desc    Lista orçamentos por quantidade
 * @route   GET /budgets/amount/:amount
 */
const getBudgetsByAmount = async (req, res, next) => {
    const { amount } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'amount', parseFloat(amount));
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por quantidade:', error);
        next(error);
    }
}

/**
 * @desc    Lista orçamentos por data de criação
 * @route   GET /budgets/createdAt/:date
 */
const getBudgetsByBudgetCreatedAt = async (req, res, next) => {
    const { date } = req.params;
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'createdAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de criação do orçamento:', error);
        next(error);
    }
}

/**
 * @desc    Lista orçamentos por data de atualização
 * @route   GET /budgets/updatedAt/:date
 */
const getBudgetsByBudgetUpdatedAt = async (req, res, next) => {
    const { date } = req.params;
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'A data deve estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'updatedAt', date);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de atualização do orçamento:', error);
        next(error);
    }
}

/** 
 * @desc    Lista orçamentos por categoria
 * @route   GET /budgets/tag/:tag
 */
const getBudgetsByTag = async (req, res, next) => {
    const { tag } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'tags', tag);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por tag:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por local
 * @route GET /budgets/location/:location
 */
const getBudgetsByLocation = async (req, res, next) => {
    const { location } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'location', location);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por localização:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por moeda
 * @route GET /budgets/currency/:currency
 */
const getBudgetsByCurrency = async (req, res, next) => {
    const { currency } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'currency', currency);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por moeda:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por método de pagamento
 * @route GET /budgets/payment-method/:method
 */
const getBudgetsByPaymentMethod = async (req, res, next) => {
    const { method } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'paymentMethod', method);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por método de pagamento:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por frequência
 * @route GET /budgets/frequency/:frequency
 */
const getBudgetsByFrequency = async (req, res, next) => {
    const { frequency } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'frequency', frequency);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por frequência:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por recorrência
 * @route GET /budgets/recurrence/:recurrence
 */
const getBudgetsByRecurrence = async (req, res, next) => {
    const { recurrence } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'recurrence', recurrence);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por recorrência:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por status de pagamento
 * @route GET /budgets/payment-status/:status
 */
const getBudgetsByPaymentStatus = async (req, res, next) => {
    const { status } = req.params;
    try {
        const budgets = await firestoreService.getDocumentsByField(COLLECTION, 'paymentStatus', status);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por status de pagamento:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por data de vencimento
 * @route GET /budgets/due-date
 */
const getBudgetsByDueDate = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    // Validação de datas
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'As datas devem estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByDateRange(COLLECTION, 'dueDate', startDate, endDate);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de vencimento:', error);
        next(error);
    }
}

/**
 * @desc Lista orçamentos por data de pagamento
 * @route GET /budgets/payment-date
 */
const getBudgetsByPaymentDate = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    // Validação de datas
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'As datas devem estar no formato YYYY-MM-DD.' });
    }
    try {
        const budgets = await firestoreService.getDocumentsByDateRange(COLLECTION, 'paymentDate', startDate, endDate);
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Erro ao listar orçamentos por data de pagamento:', error);
        next(error);
    }
}

module.exports = {
    addBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetById,
    getBudgetsByCategory,
    getBudgetsByUser,
    getBudgetsByPeriod,
    getBudgetsByStatus,
    getBudgetsByPriority,
    getBudgetsByType,
    getBudgetsByDescription,
    getBudgetsByCreationDate,
    getBudgetsByUpdateDate,
    getBudgetsByUserCreatedAt,
    getBudgetsByDate,
    getBudgetsByAmount,
    getBudgetsByTag,
    getBudgetsByLocation,
    getBudgetsByCurrency,
    getBudgetsByPaymentMethod,
    getBudgetsByFrequency,
    getBudgetsByRecurrence,
    getBudgetsByPaymentStatus,
    getBudgetsByDueDate,
    getBudgetsByPaymentDate,
    getBudgetsByBudgetCreatedAt,
    getBudgetsByCreationDate,
    getBudgetsByBudgetUpdatedAt
};
//Exporta todas as funções do controller para serem usadas nas rotas