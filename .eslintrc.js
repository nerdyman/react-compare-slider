module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],

  plugins: ['react-hooks', '@typescript-eslint', 'jest'],

  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': 0,
    'no-confusing-arrow': 0,

    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/prop-types': 0,
  },
};
