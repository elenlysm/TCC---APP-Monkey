const openFinanceService = require('../services/openFinanceService');
const tokenService = require('../services/tokenService');

/**
 * Controller para integração com Open Finance.
 * Lida com a autorização via código, armazenamento de tokens,
 * coleta de extratos bancários e atualização de transações.
 */

/**
 * Recebe o código de autorização (authorization code) e troca por access token.
 * @route POST /openfinance/authorize
 * @body { code, userId }
 */
const handleAuthorization = async (req, res) => {
    const { code, userId } = req.body;

    if (!code || !userId) {
        return res.status(400).json({ error: 'code e userId são obrigatórios.' });
    }

    try {
        const tokens = await openFinanceService.exchangeCodeForToken(code);

        await tokenService.saveToken(userId, tokens);

        res.status(200).json({ message: 'Autorização realizada com sucesso.' });
    } catch (error) {
        console.error('Erro na autorização OpenFinance:', error);
        res.status(500).json({ error: 'Falha ao processar autorização.' });
    }
};

/**
 * Coleta extratos bancários usando tokens armazenados.
 * Faz refresh do token se necessário.
 * @route POST /openfinance/statements
 * @body { userId }
 */
const collectStatements = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId é obrigatório.' });
    }

    try {
        const tokens = await tokenService.getToken(userId);

        if (!tokens || !tokens.access_token) {
            return res.status(404).json({ error: 'Token não encontrado para este usuário.' });
        }

        let accessToken = tokens.access_token;

        try {
            const statements = await openFinanceService.fetchBankStatements(accessToken);
            await openFinanceService.updateTransactions(userId, statements);

            return res.status(200).json({ message: 'Transações atualizadas com sucesso.' });
        } catch (err) {
            if ((err.response && err.response.status === 401) || err.status === 401) {
                const newTokens = await openFinanceService.refreshAccessToken(userId);

                if (!newTokens || !newTokens.access_token) {
                    return res.status(401).json({ error: 'Falha ao renovar token de acesso.' });
                }

                accessToken = newTokens.access_token;
                await tokenService.saveToken(userId, newTokens);

                const statements = await openFinanceService.fetchBankStatements(accessToken);
                await openFinanceService.updateTransactions(userId, statements);

                return res.status(200).json({ message: 'Transações atualizadas com sucesso após refresh.' });
            }

            throw err;
        }
    } catch (error) {
        console.error('Erro ao coletar extratos:', error);
        return res.status(500).json({ error: 'Falha ao coletar extratos bancários.' });
    }
};  

module.exports = {
    handleAuthorization,
    collectStatements
};
// Exporta as funções do controller para serem usadas nas rotas