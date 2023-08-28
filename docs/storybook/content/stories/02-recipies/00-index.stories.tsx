import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { argTypes, args } from '../config';

export default {
  title: 'Recipies',
  component: ReactCompareSlider,
  args,
  argTypes,
} as Meta;

export const Labels: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [labelVisibility, setLabelVisibility] = React.useState(1);

  const labelStyle = {
    fontSize: '1.5rem',
    position: 'absolute',
    padding: '1rem',
    color: 'white',
    opacity: labelVisibility,
    border: '2px solid white',
    borderRadius: '.5rem',
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    transition: 'opacity 0.25s ease-in-out',
  };

  console.log('!!', props.style);

  return (
    <ReactCompareSlider
      {...props}
      onPointerDown={() => setLabelVisibility(0)}
      onPointerUp={() => setLabelVisibility(1)}
      itemOne={
        <div
          style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'start' }}
        >
          <div style={labelStyle}>Left</div>
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-space-needle-1.jpg"
            alt="Image one"
          />
        </div>
      }
      itemTwo={
        <div
          style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'end' }}
        >
          <div style={labelStyle}>Right</div>
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-space-needle-2.jpg"
            alt="Image two"
          />
        </div>
      }
    />
  );
};

Labels.args = {
  style: {
    width: '100%',
    height: '100vh',
  },
};

export const DetectTouchDevices: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
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

export const WaitForImageLoad: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [loaded, setLoaded] = React.useState(0);
  const imagesStyle = {
    opacity: loaded === 2 ? 1 : 0,
    transition: 'opacity 1s 0.5s ease-in-out',
  };

  return (
    <ReactCompareSlider
      {...props}
      itemOne={
        <ReactCompareSliderImage
          style={imagesStyle}
          src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-space-needle-1.jpg"
          alt="Image one"
          onLoad={() => setLoaded((prev) => prev + 1)}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          style={imagesStyle}
          src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-space-needle-2.jpg"
          alt="Image two"
          onLoad={() => setLoaded((prev) => prev + 1)}
        />
      }
    />
  );
};

WaitForImageLoad.args = {
  style: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
    backgroundImage: 'radial-gradient(rgba(200, 109, 252, .5), rgba(39, 37, 39, .5))',
  },
};
