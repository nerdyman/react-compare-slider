import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { CustomStoryContainer, CustomStoryNote } from '../blocks';

import { ReactCompareSlider, ReactCompareSliderImage } from '../../src';

export const Default = () => (
  <CustomStoryContainer>
    <ReactCompareSlider
      style={{ height: '100%' }}
      itemOne={
        <ReactCompareSliderImage
          src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1500&q=80"
          alt="Image one"
          style={{ filter: 'grayscale(1)' }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1500&q=80"
          alt="Image two"
        />
      }
    />
  </CustomStoryContainer>
);

export const Portrait = () => (
  <ReactCompareSlider
    portrait
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580616591021-058e7b6c3628?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        alt="Image one"
        style={{ filter: 'grayscale(1)' }}
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580616591021-058e7b6c3628?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        alt="Image two"
      />
    }
  />
);

export const OnPositionChange = () => (
  <div>
    <CustomStoryNote>
      <em>Note:</em> This demo will be slightly laggy when viewing the action
      logging output.
    </CustomStoryNote>
    <ReactCompareSlider
      onPositionChange={action('onChange')}
      portrait
      itemOne={
        <ReactCompareSliderImage
          src="https://images.unsplash.com/photo-1580617971729-27c448892e5a?auto=format&fit=crop&w=1500&q=80"
          alt="Image one"
          style={{ filter: 'grayscale(1)' }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://images.unsplash.com/photo-1580617971729-27c448892e5a?auto=format&fit=crop&w=1500&q=80"
          alt="Image two"
        />
      }
    />
  </div>
);

export const Playground = () => (
  <CustomStoryContainer>
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
            'https://images.unsplash.com/photo-1567533905227-039caf02237a?auto=format&fit=crop&w=1267&q=80'
          )}
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={text(
            'itemTwo - img src',
            'https://images.unsplash.com/photo-1526182178-ecca0799acd8?auto=format&fit=crop&w=1267&q=80'
          )}
          alt="Image two"
        />
      }
    />
  </CustomStoryContainer>
);

export default {
  title: 'Demos/Images',
  // component: ReactCompareSlider,
  decorators: [withKnobs],
  // parameters: { options: {} }
};
