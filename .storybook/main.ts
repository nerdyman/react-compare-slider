const path = require('path');
const codesandbox = require('remark-codesandbox');

module.exports = {
  addons: [
    '@storybook/addon-viewport',
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
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
  ],
  features: {
    interactionsDebugger: true,
  },
  /** Files to load as stories */
  stories: ['../docs/**/*.stories.@(mdx|tsx)'],

  /** Customise webpack config */
  webpackFinal: async (config) => {
    // @HACK Horrific hack to shoehorn `remark-codesandbox` plugin into presets
    //       by checking if they have a `remarkPlugins` option.
    config.module.rules = config.module.rules.map((rule) => {
      if (Array.isArray(rule.use)) {
        rule.use = rule.use.map((use) => {
          if (use.options && use.options.remarkPlugins) {
            console.log('\t[main][CUSTOM] Found remark plugins.');
            use.options.remarkPlugins.push([
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
          }

          return use;
        });
      }

      return rule;
    });

    config.resolve.alias['react-compare-slider'] = path.resolve(__dirname, '..', 'src');

    return config;
  },
};
