import type { StoryFn } from '@storybook/react';
import React from 'react';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { argTypes, args } from '../config';

export default {
  title: 'Recipies/DetectTouchDevices',
  component: ReactCompareSlider,
  args,
  argTypes,
};

export const DetectTouchDevices: StoryFn<ReactCompareSliderProps> = (props) => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  return (
    <>
      <ReactCompareSlider
        {...props}
        onlyHandleDraggable={isTouchDevice}
        itemOne={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-space-needle-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-space-needle-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', height: '100vh' }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.5,
          padding: '0.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: 'white',
          pointerEvents: 'none',
          borderRadius: '0 0 0.25rem 0',
        }}
      >
        Enable <code style={{ fontSize: '1rem' }}>onlyHandleDraggable</code> for touch devices only
        <br />
        Is touch device: <code style={{ fontSize: '1rem' }}>{String(isTouchDevice)}</code>
      </span>
    </>
  );
};

DetectTouchDevices.argTypes = {
  onlyHandleDraggable: {
    control: {
      disable: true,
    },
  },
};

DetectTouchDevices.args = {};
