import type { StoryObj } from '@storybook/react';
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { argTypes, args } from '../config';

export default {
  title: 'Demos/Edge Cases',
  component: ReactCompareSlider,
  args,
  argTypes,
};

export const Scaled: StoryObj = ({ style, ...props }) => (
  <ReactCompareSlider
    {...props}
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1280&q=80"
        style={{ filter: 'grayscale(1)' }}
        alt="one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1280&q=80"
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
