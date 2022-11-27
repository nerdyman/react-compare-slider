import { Theme, themes } from '@storybook/theming';

export const theme: Partial<Theme> = {
  ...themes.dark,
  appBorderRadius: 3,
  colorSecondary: '#b464fa',
  barSelectedColor: '#b464fa',
};
