/* eslint-env node */

import { resolve } from 'node:path';

import type { AddonOptionsVite } from '@storybook/addon-coverage';
import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },

  framework: '@storybook/react-vite',

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/jest',
    '@storybook/addon-coverage',
    '@storybook/addon-storysource',
  ],

  stories: ['../content/**/*.stories.@(mdx|tsx)'],

  viteFinal: async (config) => {
    const libPath = resolve(__dirname, '..', 'src');
    console.info(`\n\n[SB CUSTOM] Using lib path: ${libPath}\n\n`);

    const finalConfig = mergeConfig(config, {
      resolve: {
        alias: {
          /**
           * @NOTE This alias is needed for Storybook to correctly generate docs.
           *       Importing from the parent `src` directory does not fully work.
           */
          'react-compare-slider': libPath,
        },
      },
    });

    return finalConfig;
  },
};

export default config;
