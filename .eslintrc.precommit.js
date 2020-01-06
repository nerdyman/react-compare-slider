module.exports = {
  extends: './.eslintrc',
  rules: {
    'no-alert': 'error',
    'no-console': ['error', { allow: ['warn'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
