/* eslint-env node */
/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main', 'next'],
  dryRun: true,
  plugins: [
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    // '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};
