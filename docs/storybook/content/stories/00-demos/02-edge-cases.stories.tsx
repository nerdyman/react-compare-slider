import type { Meta, StoryFn } from '@storybook/react';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { argTypes, args } from '../config';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Demos/Edge Cases',
  component: ReactCompareSlider,
  args,
  argTypes,
};
export default meta;

export const Scaled: StoryFn<ReactCompareSliderDetailedProps> = ({ style, ...props }) => (
  <ReactCompareSlider
    {...props}
    itemOne={
      <ReactCompareSliderImage
        src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
        alt="one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
        alt="two"
      />
    }
    style={{ width: '100%', height: '100vh', ...style }}
  />
);

Scaled.args = {
  style: {
    transform: 'scale(0.75)',
  },
};
