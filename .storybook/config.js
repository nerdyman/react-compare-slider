import { addDecorator, addParameters, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { themes } from '@storybook/theming';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addDecorator(withKnobs);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'bottom',
    theme: {
      ...themes.dark,
      // brandImage: '',
      brandTitle: 'React Compare Slider',
      url: 'https://github.com/nerdyman/react-compare-slider',
    },
  },
});

configure(
  [
    require.context('../docs/docs', true, /Intro.story.mdx/),
    require.context('../docs/docs', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
    require.context('../docs/demos', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  ],
  module
);
