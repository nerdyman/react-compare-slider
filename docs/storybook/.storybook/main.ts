/* eslint-env node */

import { resolve } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
    disableWhatsNewNotifications: true,
  },

  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mdx-gfm',
    // '@storybook/addon-storysource',
  ],

  stories: ['../content/**/*.mdx', '../content/**/*.stories.@(ts|tsx)'],

  viteFinal: async (config) => {
    const { dirname } = await import('node:path');
    const { fileURLToPath } = await import('node:url');

    const __dirname = dirname(fileURLToPath(import.meta.url));
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
