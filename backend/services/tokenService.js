const crypto = require('crypto');
const { db } = require('../firebaseAdmin');

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.ENCRYPTION_SECRET, 'salt', 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (hash) => {
    const parts = hash.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
};

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
