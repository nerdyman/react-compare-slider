const path = require('path');

const codesandbox = require('remark-codesandbox');

const config = {
  core: {
    builder: 'webpack5',
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin',
  },

  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        sourceLoaderOptions: {
          rule: {
            include: [path.resolve(__dirname, '../content'), path.resolve(__dirname, '../src')],
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

  /** Files to load as stories */
  stories: ['../content/**/*.stories.@(mdx|tsx)'],
  /** Customise webpack config */
  webpackFinal: async (config) => {
    const mdxConfig = config.module.rules
      .find((rule) => rule?.test?.test?.('stories.mdx') && !rule?.exclude?.test?.('stories.mdx'))
      ?.use?.find?.((use) => use.loader.includes('@storybook/mdx1-csf'));
    console.debug('using MDX config', mdxConfig);

    mdxConfig.options = mdxConfig.options || {};
    mdxConfig.options.remarkPlugins = mdxConfig.options.remarkPlugins || [];
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

    return config;
  },
};

module.exports = config;
