import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

/**
 * @see https://storybook.js.org/docs/configurations/options-parameter/
 */
addons.setConfig({
  showAddonsPanel: false,
  panelPosition: 'bottom',
  theme: create({
    base: 'dark',
    brandTitle: 'React Compare Slider',
    brandUrl: 'https://github.com/nerdyman/react-compare-slider',
    gridCellSize: 12,
  }),
});
