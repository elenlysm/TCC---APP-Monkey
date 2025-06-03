const axios = require('axios');
const { db } = require('../firebaseAdmin');

// Config base da API Open Finance
const api = axios.create({
    baseURL: 'https://api.openfinance.com.br',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

// Trocar o code pelo access_token
const refreshAccessToken = async (userId) => {
    const tokens = await tokenService.getToken(userId);
    if (!tokens) throw new Error('Token não encontrado');
    const response = await api.post('/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: tokens.refresh_token,
        client_id: process.env.OPEN_FINANCE_CLIENT_ID,
        client_secret: process.env.OPEN_FINANCE_CLIENT_SECRET
    });

    await tokenService.saveToken(userId, response.data);
    return response.data.access_token;
};

module.exports = { refreshAccessToken };
// Coletar extratos bancários
const fetchBankStatements = async (accessToken) => {
    const response = await api.get('/bank/statements', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};

// Atualizar transações no Firestore
const updateTransactions = async (userId, transactions) => {
    const batch = db.batch();
    transactions.forEach((t) => {
        const docRef = db.collection('transactions').doc();
        batch.set(docRef, { ...t, userId, createdAt: new Date() });
    });
    await batch.commit();
};

module.exports = {
    exchangeCodeForToken,
    fetchBankStatements,
    updateTransactions
};
