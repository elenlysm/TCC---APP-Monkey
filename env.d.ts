// Declara o módulo '@env' para importar variáveis de ambiente
declare module '@env' {
    // Variáveis de ambiente usadas para configuração do Firebase
    export const FIREBASE_API_KEY: string;
    export const FIREBASE_AUTH_DOMAIN: string;
    export const FIREBASE_PROJECT_ID: string;
    export const FIREBASE_STORAGE_BUCKET: string;
    export const FIREBASE_MESSAGING_SENDER_ID: string;
    export const FIREBASE_APP_ID: string;
}

// Declara o módulo 'react-native-dotenv' para compatibilidade com o pacote de variáveis de ambiente
declare module 'react-native-dotenv' {
    // As mesmas variáveis de ambiente, para uso consistente no projeto
    export const FIREBASE_API_KEY: string;
    export const FIREBASE_AUTH_DOMAIN: string;
    export const FIREBASE_PROJECT_ID: string;
    export const FIREBASE_STORAGE_BUCKET: string;
    export const FIREBASE_MESSAGING_SENDER_ID: string;
    export const FIREBASE_APP_ID: string;
}
