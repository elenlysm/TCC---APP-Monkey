module.exports = function (api) {
    // Cache do Babel para melhorar performance no build
    api.cache(true);
    return {
        // Preset padrão do Expo para React Native
        presets: ['babel-preset-expo'],
        plugins: [
            ['module:react-native-dotenv', {
                // Nome do módulo que você usa para importar variáveis de ambiente
                moduleName: '@env',
                // Caminho do arquivo .env na raiz do projeto  
                path: '.env',
                blocklist: null,
                allowlist: null,
                // exige que todas as variáveis do .env estejam definidas
                safe: true,
                // Não permite variáveis indefinidas    
                allowUndefined: false,
            }],
            ['module-resolver', {
                // Define a raiz para resolver imports, facilita '@' como alias
                root: ['./app'],
                alias: {
                    // Alias '@' mapeado para './app', simplificando imports no projeto
                    '@': './app',
                },
            }],
        ],
    };
};
