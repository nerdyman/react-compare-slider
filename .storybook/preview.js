import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

addDecorator(withKnobs);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    showRoots: true,
    storySort: (a, b) => {
      if (a[0].includes('docs-')) {
        if (a[0].includes('intro-')) {
          return -1;
        }

        return 0;
      }

      return 1;
    },
    theme: {
      ...themes.dark,
      appBorderRadius: 3,
      colorSecondary: '#b464fa',
      barSelectedColor: '#b464fa',
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    // defaultViewport: 'Initial',
  },
});
