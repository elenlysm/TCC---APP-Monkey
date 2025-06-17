const crypto = require('crypto');
const { db } = require('../firebaseAdmin');

const algorithm = 'aes-256-cbc';
const secret = process.env.ENCRYPTION_SECRET;

if (!secret) {
    throw new Error('ENCRYPTION_SECRET não definida no arquivo .env');
}

const key = crypto.scryptSync(secret, 'salt', 32);


/**
 * Gera um IV aleatório para cada criptografia.
 * O IV é salvo junto com o token criptografado.
 */
const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // IV deve ser único para cada operação
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

/**
 * Descriptografa o token usando o IV salvo junto ao hash.
 */
const decrypt = (hash) => {
    const parts = hash.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
};

/**
 * Salva tokens criptografados no Firestore.
 */
const saveToken = async (userId, tokenData) => {
    const encryptedToken = encrypt(tokenData.access_token);
    const refreshToken = encrypt(tokenData.refresh_token);
    await db.collection('openFinanceTokens').doc(userId).set({
        accessToken: encryptedToken,
        refreshToken: refreshToken,
        expiresIn: tokenData.expires_in,
        updatedAt: new Date()
    });
};

/**
 * Recupera e descriptografa tokens do Firestore.
 */
const getToken = async (userId) => {
    const doc = await db.collection('openFinanceTokens').doc(userId).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return {
        access_token: decrypt(data.accessToken),
        refresh_token: decrypt(data.refreshToken),
        expires_in: data.expiresIn
    };
};

module.exports = { saveToken, getToken };
