import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import securityPlugin from 'eslint-plugin-security';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  expoConfig,
  {
    // Ignora diretórios de build
    ignores: [
      'dist/*',
      'build/*',
      'web-build/*',
      '.expo/*'
    ],

    // Arquivos a serem analisados
    files: ['**/*.{ts,tsx}'], // Se quiser incluir JS, adicione: '{js,jsx,ts,tsx}'

    // Configuração de parser para TypeScript
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
    },

    // Plugins adicionais
    plugins: {
      '@typescript-eslint': typescriptPlugin, // Para regras específicas do TS
      security: securityPlugin,           // Para evitar vulnerabilidades comuns
      prettier: prettierPlugin,           // Integração de formatação
    },

    // Extensões recomendadas
    extends: [
      'plugin:security/recommended',
      'plugin:prettier/recommended',
    ],

    // Regras personalizadas
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-misused-promises': 'error',

      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',

      'no-console': 'warn',
      'no-alert': 'error',
      'prettier/prettier': 'warn',
    },
  },
]);
// Este arquivo configura o ESLint para o projeto, incluindo regras específicas para TypeScript,
// plugins de segurança e formatação, além de ignorar diretórios de build.
// Ele também define regras personalizadas para melhorar a qualidade do código e evitar vulnerabilidades comuns.
// A configuração é baseada na configuração padrão do Expo, mas adaptada para incluir TypeScript e plugins adicionais.
// A função `defineConfig` é usada para criar uma configuração moderna e fácil de ler.
// A configuração inclui plugins para segurança e formatação, além de regras personalizadas para melhorar a qualidade do código.
// A configuração do parser é ajustada para TypeScript, permitindo o uso de recursos avançados da linguagem.
// A configuração também ignora diretórios de build comuns, como `dist`, `build`, `web-build` e `.expo`, para evitar erros ao analisar arquivos que não são relevantes para o linting.
// A configuração é exportada como um módulo, permitindo que o ESLint a utilize ao analisar o código do projeto.