/* eslint no-undef: 0, @typescript-eslint/no-var-requires: 0 */
const analyzer = require('rollup-plugin-analyzer');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, _options) {
    config.plugins.push(analyzer({ summaryOnly: true, hideDeps: true }));

    return config;
  },
};
