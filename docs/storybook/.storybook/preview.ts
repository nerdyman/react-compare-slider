import type { Parameters } from '@storybook/react';

import { theme } from './theme';

import '@storybook/addon-console';

export const parameters: Parameters = {
  layout: 'fullscreen',
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    /** @see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#docs-page */
    docsPage: true,
    defaultName: 'Docs',
    story: {
      inline: true,
    },
    theme,
  },
  options: {
    showRoots: true,
    theme,
  },
};
