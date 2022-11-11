const path = require('node:path');

const { mergeConfig } = require('vite');

const codesandbox = require('remark-codesandbox');

const storybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },

  framework: {
    name: '@storybook/react-vite',
    options: { fastRefresh: true },
  },

  csfPluginOptions: {},

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/jest',
    '@storybook/addon-coverage',
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
  ],

  /** Files to load as stories */
  stories: ['../docs/**/*.stories.@(mdx|tsx)'],

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          ['react-compare-slider']: path.resolve(__dirname, '..', 'src'),
        },
      },
    });
  },
};

module.exports = storybookConfig;
