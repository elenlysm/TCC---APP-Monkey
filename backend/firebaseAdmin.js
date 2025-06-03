const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

module.exports = admin;
// Exporta o objeto admin para uso em outros módulos
// Isso permite que você use o Firebase Admin SDK em outras partes do seu aplicativo