import type { Parameters, Preview } from '@storybook/react-vite';
import { spyOn } from 'storybook/test';
import { theme } from './theme';

export const beforeEach = () => {
  spyOn(console, 'log').mockName('console.log');
  spyOn(console, 'warn').mockName('console.warn');
};

// Needed for the browsing context tests.
if (!globalThis.window) (globalThis as any).window = {};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      /** @see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#docs-page */
      docsPage: true,
      codePanel: true,
      defaultName: 'Docs',
      story: {
        inline: true,
      },
      theme,
      toc: true,
    },
    options: {
      showRoots: true,
      theme,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
