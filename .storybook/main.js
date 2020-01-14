const path = require('path');

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    {
      name: '@storybook/preset-typescript',
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          propFilter: prop => {
            // Filter out props from styled-components
            if (
              prop.name === 'as' ||
              prop.name === 'ref' ||
              prop.name === 'theme'
            ) {
              return false;
            }

            if (prop.parent == null) {
              return true;
            }

            // Filter outs props from react types
            return (
              prop.parent.fileName.indexOf('node_modules/@types/react') < 0
            );
          },
        },
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../example'),
          path.resolve(__dirname, '../docs'),
        ],
      },
    },
  ],
  stories: [
    '../docs/docs/Intro.story.mdx',
    '../docs/docs/**/*.story.(mdx|tsx)',
    '../docs/demos/**/*.story.(mdx|tsx)',
  ],
};
