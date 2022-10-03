const path = require('path');

const codesandbox = require('remark-codesandbox');

const storybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-console',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/jest',
    '@storybook/addon-coverage',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        sourceLoaderOptions: {
          rule: {
            include: [
              path.resolve(__dirname, '../docs'),
              path.resolve(__dirname, '../src'),
            ],
          },
        },
      },
    },
  ],
  /** Files to load as stories */
  stories: ['../docs/**/*.stories.@(mdx|tsx)'],
  /** Customise webpack config */
  webpackFinal: async (config) => {
    console.group('[webpackFinal]');

    const mdxConfig = config.module.rules
      .find(
        (rule) => rule?.test?.test?.('story.mdx') && !rule?.exclude?.test?.('story.mdx')
      )
      ?.use?.find?.((use) => use.loader.includes('@storybook/mdx1-csf'));

    console.debug('using MDX config', mdxConfig);

    mdxConfig.options = mdxConfig.options ?? {};
    mdxConfig.options.remarkPlugins = mdxConfig.options.remarkPlugins ?? [];
    mdxConfig.options.remarkPlugins.push([
      codesandbox,
      {
        autoDeploy: process.env.NODE_ENV === 'production',
        mode: 'iframe',
        customTemplates: {
          'react-compare-slider': {
            entry: 'src/App.jsx',
            extends: '9si6l',
          },
        },
        query: {
          view: 'preview',
          hidedevtools: 1,
          hidenavigation: 1,
          fontsize: 14,
        },
      },
    ]);

    config.resolve.alias['react-compare-slider'] = path.resolve(__dirname, '..', 'src');

    console.groupEnd();

    return config;
  },
};

module.exports = storybookConfig;
