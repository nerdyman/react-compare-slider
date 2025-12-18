import type { StorybookConfig } from '@storybook/react-vite';

import remarkGfm from 'remark-gfm';

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
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
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
  ],

  stories: ['../content/**/*.mdx', '../content/**/*.stories.@(ts|tsx)'],
};

export default config;
