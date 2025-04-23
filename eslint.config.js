import globals from 'globals'
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
const { configs } = tsPlugin;

/** @type {import('@eslint/js').FlatConfig[]} */
export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['node_modules', 'build'],
    languageOptions: {
      globals: globals.browser,
      parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      ecmaVersion: 2020
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      // Recommended TypeScript rules
      ...configs.recommended.rules,
      ...configs['recommended-requiring-type-checking'].rules,

      // Recommended React rules
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-key': 'error',

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',

      'no-case-declarations': 'off',
      "indent": ["error", 2, { "SwitchCase": 1 }],
      'semi': ['warn', 'always'],
      'quotes': ['error', 'single'],
      'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }],
      'no-trailing-spaces': ['warn'],
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
