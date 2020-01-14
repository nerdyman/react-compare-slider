import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { StoryContainer, StoryNote } from '../blocks';

import { ReactCompareSlider, ReactCompareSliderImage } from '../../src';

export const Default = () => (
  <ReactCompareSlider
    itemOne={
      <ReactCompareSliderImage
        src="https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt="Image one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt="Image one"
        style={{ filter: 'blur(10px) brightness(1.25)' }}
      />
    }
  />
);

export const Portrait = () => (
  <ReactCompareSlider
    portrait
    itemOne={
      <ReactCompareSliderImage
        src="https://images.pexels.com/photos/230887/pexels-photo-230887.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        alt="Image one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.pexels.com/photos/230887/pexels-photo-230887.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        alt="Image one"
        style={{ filter: 'blur(10px) brightness(1.25)' }}
      />
    }
  />
);

export const OnPositionChange = () => (
  <>
    <StoryNote>
      <em>Note:</em> The demo&rsquo;s action logging may cause some slight lag.
    </StoryNote>
    <ReactCompareSlider
      onPositionChange={action('onChange')}
      portrait
      itemOne={
        <ReactCompareSliderImage
          src="https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Image one"
          style={{ filter: 'blur(10px) brightness(1.25)' }}
        />
      }
    />
  </>
);

export const Playground = () => (
  <StoryContainer>
    <ReactCompareSlider
      style={{ height: '100vh' }}
      position={number('position', 50, {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      })}
      onPositionChange={action('onPositionChange')}
      portrait={boolean('portrait', false)}
      itemOne={
        <ReactCompareSliderImage
          src={text(
            'itemOne - img src',
            'https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          )}
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={text(
            'itemTwo - img src',
            'https://images.pexels.com/photos/1834396/pexels-photo-1834396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          )}
          alt="Image one"
          style={{ filter: 'blur(10px) brightness(1.25)' }}
        />
      }
    />
  </StoryContainer>
);

export default {
  title: 'Demos/Images',
  component: Default,
  decorators: [withKnobs],
  // parameters: {  }
};
