import { withConsole } from '@storybook/addon-console';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';

import { theme } from './theme';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    inlineStories: true,
    theme,
  },
  options: {
    showRoots: true,
    theme,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
