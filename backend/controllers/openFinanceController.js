const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');

const handleAuthorization = async (req, res) => {
    const { code, userId } = req.body;
    try {
        const accessToken = await openFinanceService.exchangeCodeForToken(code);
        // Aqui você poderia armazenar o accessToken no Firestore ou outro local seguro.
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const collectStatements = async (req, res) => {
    const { userId } = req.body;

    try {
        // Buscar tokens armazenados e descriptografados
        let tokens = await tokenService.getToken(userId);

        if (!tokens) {
            return res.status(404).json({ error: 'Token não encontrado para este usuário.' });
        }

        let accessToken = tokens.access_token;

        try {
            // Tentar coletar extratos com o token atual
            const statements = await openFinanceService.fetchBankStatements(accessToken);
            await openFinanceService.updateTransactions(userId, statements);
            return res.status(200).json({ message: 'Transações atualizadas com sucesso' });
        } catch (err) {
            // Se o token expirou, tenta com o refresh token
            if (err.response && err.response.status === 401) {
                accessToken = await openFinanceService.refreshAccessToken(userId);
                const statements = await openFinanceService.fetchBankStatements(accessToken);
                await openFinanceService.updateTransactions(userId, statements);
                return res.status(200).json({ message: 'Transações atualizadas com sucesso após refresh' });
            } else {
                throw err;
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { handleAuthorization, collectStatements };
