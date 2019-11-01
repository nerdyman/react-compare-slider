const path = require('path');

const sourceDirs = [
  path.resolve(__dirname, '../src'),
  path.resolve(__dirname, '../example'),
  path.resolve(__dirname, '../docs'),
];

module.exports = [
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
          return prop.parent.fileName.indexOf('node_modules/@types/react') < 0;
        },
      },
      include: [...sourceDirs],
    },
  },
  {
    name: '@storybook/addon-docs/react/preset',
    options: {
      configureJSX: true,
      // babelOptions: {},
      sourceLoaderOptions: null,
    },
  },
];
