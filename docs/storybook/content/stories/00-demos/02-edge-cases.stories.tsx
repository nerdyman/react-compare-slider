import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { args, argTypes } from '../config';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Demos/Edge Cases',
  component: ReactCompareSlider,
  args,
  argTypes,
};
export default meta;

export const Scaled: StoryFn<ReactCompareSliderDetailedProps> = ({ style, ...props }) => (
  <ReactCompareSlider
    {...props}
    itemOne={
      <ReactCompareSliderImage
        src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
        alt="one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
        alt="two"
      />
    }
    style={{ width: '100%', height: '100%', ...style }}
  />
);

Scaled.args = {
  style: {
    transform: 'scale(0.75)',
  },
};

export const MultipleSlidersWithScrolling: StoryFn<ReactCompareSliderDetailedProps> = (props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      overflowY: 'auto',
      height: 'calc(100dvh - 2rem)',
    }}
  >
    <div style={{ display: 'flex', gap: '1rem', flexShrink: 0, height: 'calc(75dvh - 2rem)' }}>
      <ReactCompareSlider
        {...props}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
            alt="Image one"
            style={{ objectPosition: 'top center' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
            alt="Image two"
            style={{ objectPosition: 'top center' }}
          />
        }
      />
      <ReactCompareSlider
        {...props}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
            alt="Image one"
            style={{ objectPosition: 'top center' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
            alt="Image two"
            style={{ objectPosition: 'top center' }}
          />
        }
      />
    </div>
    <ReactCompareSlider
      {...props}
      style={{ flexShrink: 0, height: 'calc(75dvh - 2rem)' }}
      portrait
      itemOne={
        <ReactCompareSliderImage
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
          alt="Image one"
          style={{ objectPosition: 'top center' }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
          alt="Image two"
          style={{ objectPosition: 'top center' }}
        />
      }
    />
  </div>
);

MultipleSlidersWithScrolling.args = {};
