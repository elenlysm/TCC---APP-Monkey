const { auth } = require('../firebaseAdmin');

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido ou mal formatado.' });
    }

    const idToken = authorization.replace('Bearer ', '').trim();

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Erro ao verificar token Firebase:', error);
        return res.status(401).json({ error: 'Token de autenticação inválido.' });
    }
};

module.exports = authMiddleware;
