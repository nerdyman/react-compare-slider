import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ReactCompareSlider, ReactCompareSliderImage } from '../../src';

storiesOf('Demos|Images', module)
  .add(
    'Default',
    () => (
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
    ),
    { options: { showPanel: true } }
  )
  .add(
    'Portrait',
    () => (
      <ReactCompareSlider
        id="test"
        className="test"
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
    ),
    { options: { showPanel: true } }
  )
  .add(
    'onChange',
    () => (
      /** @NOTE `action` in Storybook makes this a little bit laggy */
      <ReactCompareSlider
        onChange={action('onChange')}
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
    ),
    { options: { showPanel: true } }
  );
