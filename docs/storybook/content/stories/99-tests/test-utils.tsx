import type { StoryFn } from '@storybook/react-vite';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { fn } from 'storybook/test';

export const Template: StoryFn<ReactCompareSliderDetailedProps> = (args) => <ReactCompareSlider {...args} />;

export const SLIDER_ROOT_TEST_ID = 'rcs-root';

export const getArgs = (
  args: Partial<ReactCompareSliderDetailedProps> = {},
): Partial<Record<string, unknown> & ReactCompareSliderDetailedProps & { 'data-testid': string }> => ({
  'data-testid': SLIDER_ROOT_TEST_ID,
  onPositionChange: fn(console.log),
  style: { width: '100%', height: '100vh' },
  itemOne: (
    <ReactCompareSliderImage
      src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png"
      alt="one"
    />
  ),
  itemTwo: (
    <ReactCompareSliderImage
      src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-2.png"
      alt="two"
    />
  ),
  ...args,
});
