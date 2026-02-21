import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderHandle, ReactCompareSliderImage } from 'react-compare-slider';

import { args, argTypes } from '../config';

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
    handle={<ReactCompareSliderHandle style={{ '--rcs-handle-color': 'yellow' } as React.CSSProperties} />}
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
    style={{ flexGrow: 1, width: '100%', height: '100%', maxHeight: '100dvh' }}
  />
);

export const IndividualStyles: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        buttonStyle={
          {
            '--rcs-handle-color': '#444',
            backdropFilter: undefined,
            WebkitBackdropFilter: undefined,
            backgroundColor: 'white',
            boxShadow: undefined,
            border: 0,
          } as React.CSSProperties
        }
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
    style={{ flexGrow: 1, width: '100%', height: '100%', maxHeight: '100dvh' }}
  />
);

export const HideButton: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        buttonStyle={{ display: 'none' }}
        // Make lines thicker so they're easier to grab.
        linesStyle={{
          width: portrait ? '100%' : 8,
          height: portrait ? 8 : '100%',
          outlineWidth: 4,
          outlineOffset: -4,
          boxShadow: 'none',
        }}
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
    style={{ flexGrow: 1, width: '100%', height: '100%', maxHeight: '100dvh' }}
  />
);

export const HideLines: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        buttonStyle={{
          border: 0,
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
    style={{ flexGrow: 1, width: '100%', height: '100%', maxHeight: '100dvh' }}
  />
);
