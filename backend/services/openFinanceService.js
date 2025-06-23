const axios = require('axios');
const { db } = require('../firebaseAdmin');
const tokenService = require('./tokenService');

//Config base da API Open Finance (ajuste para mock-api no Docker)
const api = axios.create({
    baseURL: process.env.OPEN_FINANCE_API_URL || 'http://mockapi:3000', // Use variável de ambiente para flexibilidade
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

//Função para trocar código (authorization code) por access token
const exchangeCodeForToken = async (code) => {
    try {
        const response = await api.post('/oauth/token', {
            grant_type: 'authorization_code',
            code,
            client_id: process.env.OPEN_FINANCE_CLIENT_ID,
            client_secret: process.env.OPEN_FINANCE_CLIENT_SECRET,
            redirect_uri: process.env.OPEN_FINANCE_REDIRECT_URI
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao trocar código por token:', error.response?.data || error.message);
        throw new Error('Falha ao obter access token.');
    }
};

//Função para atualizar token usando refresh token
const refreshAccessToken = async (userId) => {
    try {
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
    } catch (error) {
        console.error('Erro ao atualizar access token:', error.response?.data || error.message);
        throw new Error('Falha ao atualizar access token.');
    }
};

//Coletar extratos bancários
const fetchBankStatements = async (accessToken) => {
    try {
        const response = await api.get('/bank/statements', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar extratos:', error.response?.data || error.message);
        throw new Error('Falha ao buscar extratos bancários.');
    }
};

//Atualizar transações no Firestore
const updateTransactions = async (userId, transactions) => {
    if (!Array.isArray(transactions)) throw new Error('Transações inválidas');
    const batch = db.batch();
    transactions.forEach((t) => {
        // Se possível, use um id único da transação para evitar duplicidade
        const docRef = db.collection('transactions').doc(t.id || undefined);
        batch.set(docRef, { ...t, userId, createdAt: new Date() });
    });
    await batch.commit();
};

// Instância separada só para Admin API (usando a URL da Admin API do .env)
const adminApi = axios.create({
    baseURL: process.env.ADMIN_API_BASE_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

// Função para pegar as métricas da Admin API
const getAdminMetrics = async () => {
    try {
        const response = await adminApi.get('/metrics');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar métricas da Admin API:', error.response?.data || error.message);
        throw new Error('Falha ao buscar métricas da Admin API');
    }
};


module.exports = {
    exchangeCodeForToken,
    refreshAccessToken,
    fetchBankStatements,
    updateTransactions,
    getAdminMetrics
};
