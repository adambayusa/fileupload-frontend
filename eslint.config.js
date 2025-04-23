import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends('react-app'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Add custom rules here if needed
    },
  },
];

export default eslintConfig;