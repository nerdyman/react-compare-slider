import type { Meta, StoryFn } from '@storybook/react';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from 'react-compare-slider';

import { argTypes, args } from '../config';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Handles',
  component: ReactCompareSlider,
  args,
  argTypes,
};
export default meta;

export const InheritedColor: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={<ReactCompareSliderHandle portrait={portrait} style={{ color: 'yellow' }} />}
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const IndividualStyles: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        portrait={portrait}
        buttonStyle={{
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          backgroundColor: 'white',
          color: '#444',
          boxShadow: undefined,
          border: 0,
        }}
        linesStyle={{ opacity: 0.5 }}
      />
    }
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const HideButton: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        portrait={portrait}
        buttonStyle={{ display: 'none' }}
        // Make lines thicker so they're easier to grab.
        linesStyle={{ width: portrait ? '100%' : 4, height: portrait ? 4 : '100%' }}
      />
    }
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const HideLines: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        portrait={portrait}
        buttonStyle={{
          border: 0,
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          boxShadow: 'none',
        }}
        linesStyle={{ opacity: 0 }}
      />
    }
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
    style={{ width: '100%', height: '100vh' }}
  />
);
