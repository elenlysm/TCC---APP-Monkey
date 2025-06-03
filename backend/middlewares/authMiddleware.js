const { auth } = require('./firebaseAdmin');

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido ou inválido' });
    }

    const idToken = authorization.split('Bearer ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;
