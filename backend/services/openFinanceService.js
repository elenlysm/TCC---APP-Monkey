const axios = require('axios');
const { db } = require('../firebaseAdmin');
const tokenService = require('./tokenService'); // lembre de importar, pois usa tokenService

// Config base da API Open Finance
const api = axios.create({
    baseURL: 'https://api.openfinance.com.br',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

// Função para trocar código (authorization code) por access token
const exchangeCodeForToken = async (code) => {
    const response = await api.post('/oauth/token', {
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.OPEN_FINANCE_CLIENT_ID,
        client_secret: process.env.OPEN_FINANCE_CLIENT_SECRET,
        redirect_uri: process.env.OPEN_FINANCE_REDIRECT_URI
    });
    return response.data.access_token;
};

// Função para atualizar token usando refresh token
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
    refreshAccessToken,
    fetchBankStatements,
    updateTransactions
};
