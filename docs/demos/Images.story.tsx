import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ReactCompareSlider, ReactCompareSliderImage } from '../../src';

const Note: React.FC<any> = props => (
  <p
    style={{
      fontFamily: 'sans-serif',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      color: 'white',
    }}
    {...props}
  />
);

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
      <>
        <Note>
          <em>Note:</em> The demo&rsquo;s action logging may cause some slight
          lag.
        </Note>
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
    ),
    { options: { showPanel: true } }
  );
