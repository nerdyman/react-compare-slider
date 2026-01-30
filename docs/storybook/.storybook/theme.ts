import { type Theme, themes } from 'storybook/theming';

export const theme: Partial<Theme> = {
  ...themes.dark,
  appBorderRadius: 3,
  appHoverBg: '#6e3c8b',
  colorSecondary: '#c86dfc',
  barHoverColor: '#b597c6',
  barSelectedColor: '#c86dfc',
  barTextColor: '#ffffff',
};
