import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withConsole } from '@storybook/addon-console';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
  controls: {
    hideNoControlsWarning: true,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
    inlineStories: false,
  },
  options: {
    showRoots: true,
    theme: {
      ...themes.dark,
      appBorderRadius: 3,
      colorSecondary: '#b464fa',
      barSelectedColor: '#b464fa',
    } as any,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    // defaultViewport: 'Initial',
  },
});
