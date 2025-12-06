import { addons } from '@storybook/manager-api';
import { ThemeVars } from '@storybook/theming';
import { create } from '@storybook/theming/create';

import { theme } from './theme';

/**
 * @see https://storybook.js.org/docs/configurations/options-parameter/
 */
addons.setConfig({
  showAddonsPanel: false,
  panelPosition: 'bottom',
  theme: create({
    ...theme,
    brandTitle: 'React Compare Slider',
    brandUrl: 'https://github.com/nerdyman/react-compare-slider',
    gridCellSize: 12,
  } as ThemeVars),
});
