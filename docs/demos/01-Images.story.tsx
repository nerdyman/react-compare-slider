/* eslint no-console: 0 */
import React from 'react';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

export default {
  title: 'Demos/Images',
  component: ReactCompareSlider,
  argTypes: {
    handle: { control: { type: 'function' } },
    itemOne: { control: { type: 'function' } },
    itemTwo: { control: { type: 'function' } },
    position: { control: { type: 'range', min: 0, max: 100 } },
  },
};

export const Default = (args) => (
  <ReactCompareSlider
    {...args}
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1567533905227-039caf02237a?auto=format&fit=crop&w=1267&q=80"
        alt="Image one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1526182178-ecca0799acd8?auto=format&fit=crop&w=1267&q=80"
        alt="Image two"
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);

export const Portrait = (args) => (
  <ReactCompareSlider
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
    {...args}
    style={{ width: '100%', height: '100vh' }}
  />
);

Portrait.args = { portrait: true };

export const OnPositionChange = (args) => {
  const onPositionChange = React.useCallback((position) => {
    console.log('[OnPositionChange.onPositionChange]', position);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div className="sb-custom-note">
        <em>Note:</em> This demo will be slightly laggy when viewing the action
        logging output.
      </div>

      <ReactCompareSlider
        {...args}
        onPositionChange={onPositionChange}
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
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

export const BoundsPadding = ({ boundsPadding = 80, ...args }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...args}
        boundsPadding={boundsPadding}
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
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};
