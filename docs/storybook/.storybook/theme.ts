import { Theme, themes } from '@storybook/theming';

export const theme: Partial<Theme> = {
  ...themes.dark,
  appBorderRadius: 3,
  colorSecondary: '#c86dfc',
  barSelectedColor: '#c86dfc',
};
