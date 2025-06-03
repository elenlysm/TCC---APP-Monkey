import 'dotenv/config'; // Carrega as variáveis de ambiente do .env

export default {
    expo: {
        name: 'Monkey',          // Nome exibido para o usuário
        slug: 'Monkey',          // Slug usado no build e deploy do Expo
        version: '1.0.0',        // Versão do app
        orientation: 'portrait', // Orientação fixa em modo retrato
        sdkVersion: '53.0.0',    // SDK do Expo

        // Extra é usado para passar configs de ambiente para o app
        extra: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        },
    },
};
// Este arquivo configura o Expo para o seu aplicativo React Native, definindo
// nome, slug, versão e orientações, além de carregar variáveis de ambiente do arquivo .env