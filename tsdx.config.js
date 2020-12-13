/* eslint no-undef: 0, @typescript-eslint/no-var-requires: 0 */
const analyzer = require('rollup-plugin-analyzer');

module.exports = {
  // This function will run for each entry/format/env combination.
  rollup(config /*, options*/) {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(analyzer({ summaryOnly: true, hideDeps: false }));
    }

    return config;
  },
};
