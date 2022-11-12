import path from 'node:path';

import { mergeConfig } from 'vite';

export default {
  core: {
    builder: '@storybook/builder-vite',
  },

  framework: {
    name: '@storybook/react-vite',
  },

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
  stories: ['../content/**/*.stories.@(mdx|tsx)'],

  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        sourcemap: 'inline',
      },
      resolve: {
        alias: {
          ['react-compare-slider']: path.resolve(__dirname, '..', 'src'),
        },
      },
    });
  },
};
