import { withConsole } from '@storybook/addon-console';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Parameters } from '@storybook/addons';
import { addDecorator } from '@storybook/react';

import { theme } from './theme';

// Don't want to apply console hook in E2E tests.
if (process.env.NODE_ENV !== 'test') {
  addDecorator((storyFn, context) => withConsole()(storyFn)(context));
}

export const parameters: Parameters = {
  actions: {
    argTypesRegex: '^on.*',
  },
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    inlineStories: true,
    theme,
  },
  layout: 'fullscreen',
  options: {
    showRoots: true,
    theme,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
