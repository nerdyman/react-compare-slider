const path = require('path');

const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

const sourceDirs = [
  path.resolve(__dirname, '../src'),
  path.resolve(__dirname, '../example'),
  path.resolve(__dirname, '../docs'),
];

module.exports = async ({ config, mode }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: [...sourceDirs],
        use: [
          require.resolve('babel-loader'),
          require.resolve('react-docgen-typescript-loader'),
        ],
      },
      {
        test: /\.story\.mdx$/,
        include: [...sourceDirs],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-react-jsx'],
            },
          },
          {
            loader: '@mdx-js/loader',
            options: {
              compilers: [createCompiler({})],
            },
          },
        ],
      },
      {
        test: /\.story\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        loaders: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: {
              parser: 'typescript',
              injectParameters: true,
            },
          },
        ],
        enforce: 'pre',
      },
    ],
  },
  plugins: [...config.plugins],
  resolve: {
    ...config.resolve,
    modules: [...config.resolve.modules, ...sourceDirs],
    extensions: [
      ...config.resolve.extensions,
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.mdx',
    ],
  },
});
