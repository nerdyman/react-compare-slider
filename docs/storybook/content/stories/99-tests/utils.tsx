import { jest } from '@storybook/jest';
import type { StoryFn } from '@storybook/react';
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';

export const Template: StoryFn<ReactCompareSliderDetailedProps> = (args) => (
  <ReactCompareSlider {...args} />
);

export const ROOT_TEST_ID = 'rcs-root';

export const getArgs = (args: Partial<ReactCompareSliderDetailedProps> = {}) => ({
  'data-testid': ROOT_TEST_ID,
  onPositionChange: jest.fn(console.log),
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
