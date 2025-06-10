import 'dotenv/config'; // Carrega as variáveis de ambiente do .env

export default {
    expo: {
        name: "Monkey",          // Nome exibido para o usuário
        slug: "Monkey",          // Slug usado no build e deploy do Expo
        version: "1.0.0",        // Versão do app
        orientation: "portrait", // Orientação fixa em modo retrato
        icon: "./assets/images/icon.png",
        scheme: "monkey",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },

        // Extra é usado para passar configs de ambiente para o app
        extra: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '',
        },
    },
};
// Este arquivo configura o Expo para o seu aplicativo React Native, definindo
// nome, slug, versão e orientações, além de carregar variáveis de ambiente do ambiente do sistema.