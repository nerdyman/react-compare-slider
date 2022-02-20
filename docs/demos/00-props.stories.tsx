/* eslint no-console: 0 */
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderDetailedProps,
} from 'react-compare-slider';

import * as config from './config';

export default {
  title: 'Demos',
  component: ReactCompareSlider,
  argTypes: config.argTypes,
} as Meta;

export const Images: Story<ReactCompareSliderDetailedProps> = (args) => (
  <ReactCompareSlider
    {...args}
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1438401171849-74ac270044ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1784&q=70"
        alt="item one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1437809781432-a957377661ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1784&q=70"
        alt="item two"
        style={{ transform: 'scale(1.125)' }}
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);

Images.args = { boundsPadding: 0 };

export const BoundsPadding: Story<ReactCompareSliderDetailedProps> = ({
  boundsPadding = 80,
  ...args
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...args}
        boundsPadding={boundsPadding}
        itemOne={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1523590564318-491748f70ea7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=70"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1574459619818-0935f6cfcb50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=70"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

BoundsPadding.args = { boundsPadding: 80 };

export const OnPositionChange: Story<ReactCompareSliderDetailedProps> = (args) => {
  const onPositionChange = React.useCallback((position) => {
    console.log('[OnPositionChange.onPositionChange]', position);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div className="sb-custom-note">
        <em>Note:</em> This demo will be slightly laggy when viewing the action logging
        output.
      </div>

      <ReactCompareSlider
        {...args}
        onPositionChange={onPositionChange}
        itemOne={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1585715492106-b0c189bcf301?auto=format&fit=crop&w=1500&q=80"
            alt="Image one"
            style={{ filter: 'grayscale(.9)' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1585715492106-b0c189bcf301?auto=format&fit=crop&w=1500&q=80"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

OnPositionChange.args = { boundsPadding: 0 };

export const OnlyHandleDraggable: Story<ReactCompareSliderDetailedProps> = ({
  onlyHandleDraggable = true,
  ...args
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...args}
        onlyHandleDraggable={onlyHandleDraggable}
        itemOne={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1563272633-16ff57209209?auto=format&fit=crop&w=1280&q=80"
            alt="Image one"
            style={{ filter: 'sepia(1)' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1563272633-16ff57209209?auto=format&fit=crop&w=1280&q=80"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

OnlyHandleDraggable.args = { onlyHandleDraggable: true };

export const Portrait: Story<ReactCompareSliderDetailedProps> = ({
  portrait = true,
  ...args
}) => (
  <ReactCompareSlider
    portrait={portrait}
    {...args}
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1596056812959-954b08fe3dda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=70"
        alt="Image one"
        style={{ filter: 'grayscale(.9)' }}
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1596056812959-954b08fe3dda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=70"
        alt="Image two"
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);

Portrait.args = { portrait: true };

export const Position: Story<ReactCompareSliderDetailedProps> = (args) => (
  <ReactCompareSlider
    {...args}
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580928046254-e255588b9c42?auto=format&fit=crop&w=1267&q=80"
        alt="Image one"
        style={{ filter: 'grayscale(1)', objectPosition: 'center top' }}
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580928046254-e255588b9c42?auto=format&fit=crop&w=1267&q=80"
        alt="Image two"
        style={{ objectPosition: 'center top' }}
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);

Position.args = { position: 25 };

export const ChangePositionOnHover: Story<ReactCompareSliderDetailedProps> = ({
  changePositionOnHover = true,
  ...args
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...args}
        changePositionOnHover={changePositionOnHover}
        itemOne={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1582545066898-e9aca56e4ae7?auto=format&fit=crop&w=1280&q=80"
            alt="Image one"
            style={{ filter: 'contrast(200%) grayscale(1)' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://images.unsplash.com/photo-1582545066898-e9aca56e4ae7?auto=format&fit=crop&w=1280&q=80"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

ChangePositionOnHover.args = { boundsPadding: 0, changePositionOnHover: true };

export const Scaled: Story<ReactCompareSliderDetailedProps> = ({ style, ...args }) => (
  <ReactCompareSlider
    {...args}
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
