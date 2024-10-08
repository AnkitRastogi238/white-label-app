module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
    'plugin:jsdoc/recommended-typescript-error',
  ],
  plugins: ['svelte3', '@typescript-eslint', 'jsdoc', 'unused-imports', 'simple-import-sort'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'no-mixed-spaces-and-tabs': 1,
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^@\\w'],
          ['^(?!app)\\w'],
          ['^@white-label/core', '@white-label/utils'],
          ['^@src'],
          ['^common/config', '^common/utils', '^common/components'],
          ['^core/config', '^core/utils', '^core/components'],
          ['^features/config', '^features/utils', '^features/store', '^features/components'],
          ['interface'],
          ['module$'],
          ['component$', 'service'],
          ['constants', 'helper'],
          ['.json$'],
        ],
      },
    ],
    'no-console': ['error', { allow: ['error', 'dir', 'info', 'trace', 'warn'] }],
    'no-debugger': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-dupe-args': 'error',
  },
};
