const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      'build/*',
      'web-build/*',
      '.expo/*'
    ],
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },

    plugins: [
      '@typescript-eslint',
      'security', // Plugin de segurança
      'prettier',
    ],

    extends: [
      'plugin:security/recommended', // Regras de segurança padrão
      'plugin:prettier/recommended', // Integração com Prettier
    ],

    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error', // Evita uso de any: melhor segurança e tipagem
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-misused-promises': 'error', // Evita erros com async/await

      'no-eval': 'error',             // Proíbe eval — risco de segurança
      'no-implied-eval': 'error',     // Proíbe execuções implícitas de código
      'no-new-func': 'error',         // Proíbe Function constructor

      'security/detect-object-injection': 'warn', // Detecta possíveis injeções
      'security/detect-non-literal-fs-filename': 'warn',

      'no-console': 'warn',           // Evita vazamento de informações sensíveis via logs
      'no-alert': 'error',            // Proíbe alert/confirm/prompt
      'prettier/prettier': 'warn', // Integração com Prettier para formatação consistente
    },
  },
]);
