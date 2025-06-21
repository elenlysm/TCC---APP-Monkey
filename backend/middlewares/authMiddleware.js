const { auth } = require('../firebaseAdmin');
//Importa o serviço de autenticação do Firebase Admin SDK

const authMiddleware = async (req, res, next) => //Middleware de autenticação
{ 
    const authorization = req.headers.authorization;
    //Obtém o cabeçalho Authorization da requisição

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido ou mal formatado.' });
    } //Verifica se o cabeçalho existe e se começa com "Bearer ". Caso contrário, retorna erro 401 (não autorizado)

    const idToken = authorization.replace('Bearer ', '').trim();
    //Remove o prefixo "Bearer " do token e remove espaços em branco

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        //Verifica e decodifica o token usando o Firebase Admin
        req.user = decodedToken; //Anexa os dados do usuário verificado ao objeto da requisição
        next(); //Passa para o próximo middleware ou rota
    } catch (error) {
        console.error('Erro ao verificar token Firebase:', error);
        return res.status(401).json({ error: 'Token de autenticação inválido.' });
    } //Caso a verificação do token falhe, loga o erro no console
};

module.exports = authMiddleware
//Exporta o middleware para ser usado em rotas protegidas