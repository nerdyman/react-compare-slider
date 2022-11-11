// import { withConsole } from '@storybook/addon-console';

import '@storybook/addon-console';

import { theme } from './theme';

export const parameters = {
  layout: 'fullscreen',
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    /** @see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#docs-page */
    docsPage: 'automatic',
    defaultName: 'Docs',
    inlineStories: true,
    theme,
  },
  options: {
    showRoots: true,
    theme,
  },
};
