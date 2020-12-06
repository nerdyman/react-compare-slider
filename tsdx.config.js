/* eslint no-undef: 0, @typescript-eslint/no-var-requires: 0 */
const analyzer = require('rollup-plugin-analyzer');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(analyzer({ summaryOnly: true, hideDeps: true }));

    if (options.env === 'production') {
      config.plugins.push(terser());
    }

    return config;
  },
};
