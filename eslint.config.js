// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*',
      'build/*',
      'web-build/*',
      '.expo/*'],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'security': require('eslint-plugin-security'),
      'prettier': require('eslint-plugin-prettier'),
    },
    extends: [
      'plugin:security/recommended',
      'plugin:prettier/recommended',
    ],
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
