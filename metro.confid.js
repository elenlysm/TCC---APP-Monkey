const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

// Suporte a SVG como componente React
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Permitir importação de arquivos SVG como componentes React
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// Configuração de aliases
config.resolver.alias = {
    '@components': './src/components',
    '@assets': './src/assets',
    '@constants': './src/constants',
};

module.exports = config;
