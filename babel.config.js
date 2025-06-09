// Configuração para Babel (transformação de código JS/TS para compatibilidade com o React Native)

module.exports = function (api) {
    // Cache do Babel para melhorar performance no build
    api.cache(true);

    return {
        // Preset padrão do Expo para React Native
        presets: ['babel-preset-expo'],

        plugins: [
            // Plugin react-native-dotenv para importar variáveis de ambiente do .env
            ['module:react-native-dotenv', {
                moduleName: '@env',           // Importação via: import { VAR } from '@env'
                path: '.env',                 // Arquivo de variáveis de ambiente
                blocklist: null,
                allowlist: null,
                safe: true,                   // Exige que todas as variáveis no .env estejam definidas
                allowUndefined: false         // Não permite variáveis indefinidas
            }],

            // Plugin module-resolver para criar aliases de importação
            ['module-resolver', {
                root: ['./app'],               // Define a raiz dos imports relativos
                alias: {
                    '@': './app',              // Agora você pode importar com "@/algumModulo"
                }
            }],

            // Plugin react-native-reanimated deve ser o último
            'react-native-reanimated/plugin'
        ]
    };
};
// Este arquivo configura o Babel para o projeto React Native, definindo presets e plugins que permitem o uso de variáveis de ambiente, aliases de importação e otimizações específicas do React Native.