export default {
    expo: {
        name: "Monkey",          //Nome do aplicativo exibido no dispositivo do usuário
        slug: "Monkey",          //Identificador único do projeto, usado no build e deploy do Expo
        version: "1.0.0",        //Versão do app (seguindo semântica: MAJOR.MINOR.PATCH)
        orientation: "portrait", //O app só funcionará no modo retrato (vertical)
        icon: "@assets/images/icon.png", // Ícone do app (exibido no dispositivo)
        scheme: "monkey", //Esquema customizado para links do tipo deep linking (ex: monkey://rota)
        userInterfaceStyle: "automatic", //Adapta o tema (claro/escuro) com base nas configurações do dispositivo
        newArchEnabled: true, //Ativa a nova arquitetura do React Native (desempenho e modularização)
        ios: {
            supportsTablet: true //Permite o uso do app em iPads
        }, 
        android: {
            adaptiveIcon: {
                foregroundImage: "@assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "@assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "@/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ]
        ],
        experiments: {
            typedRoutes: true //Ativa o uso de rotas com tipagem automática (ótimo para segurança e produtividade)
        },

        //Extra é usado para passar configs de ambiente para o app
        extra: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '', //Chave da API do Firebase
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '', //Domínio de autenticação
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',  //ID do projeto Firebase
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '', //Bucket de armazenamento
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '', //ID do remetente para notificações
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '', //ID da aplicação Firebase
            API_URL: process.env.API_URL, //URL da API externa usada no app
        },
    },
};
//Este arquivo configura o Expo para o seu aplicativo React Native, definindo nome, slug, versão
//e orientações, além de carregar variáveis de ambiente do ambiente do sistema