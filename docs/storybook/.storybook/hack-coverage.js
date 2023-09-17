/**
 * Storybook won't generate coverage for files outside of its root directory so the lib build script
 * copies the `src` dir into the Storybook project root. However, this means the coverage paths for
 * the SSR tests and Storybook tests aren't the same. This script updates the Storybook coverage
 * JSON to point to the actual `src` directory.
 */
const fs = require('node:fs');
const path = require('node:path');

console.info('[hack-coverage] 🙈 start');

const coveragePath = path.join(__dirname, '..', 'coverage', 'storybook', 'coverage-storybook.json');

const coverage = fs
  .readFileSync(coveragePath, 'utf8')
  .replaceAll('react-compare-slider/docs/storybook/src', 'react-compare-slider/lib/src');

fs.writeFileSync(coveragePath, coverage);

console.info('[hack-coverage] 🙈 complete');
