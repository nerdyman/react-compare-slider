const path = require('path');
const codesandbox = require('remark-codesandbox');

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
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
    '@storybook/addon-actions/register',
  ],
  /** Files to load as stories */
  stories: ['../docs/**/*.story.@(mdx|tsx)'],
  /** Customise webpack config */
  webpackFinal: async (config) => {
    // Enable `css` prop
    config.module.rules[0].use[0].options.presets.push(
      '@emotion/babel-preset-css-prop'
    );

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

    config.resolve.alias['react-compare-slider'] = path.resolve(
      __dirname,
      '..',
      'src'
    );

    return config;
  },
};
