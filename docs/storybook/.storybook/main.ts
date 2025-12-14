import type { StorybookConfig } from '@storybook/react-vite';

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
    '@storybook/addon-docs',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-storysource',
  ],

  stories: ['../content/**/*.mdx', '../content/**/*.stories.@(ts|tsx)'],
};

export default config;
