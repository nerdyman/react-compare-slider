import type { Story, StoryObj } from '@storybook/react';
import React from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderDetailedProps,
  ReactCompareSliderImage,
  useReactCompareSliderRef,
} from 'react-compare-slider';

import { ROOT_TEST_ID, getArgs } from '../99-tests/utils';
import { argTypes, args } from '../config';

export default {
  title: 'Demos',
  component: ReactCompareSlider,
  args,
  argTypes,
};

export const Images: StoryObj<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <ReactCompareSlider
      {...props}
      itemOne={
        <ReactCompareSliderImage
          src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/space-needle-1.jpg"
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/space-needle-2.jpg"
          alt="Image two"
        />
      }
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

Images.args = {};

export const Handle: StoryObj<ReactCompareSliderDetailedProps> = (props) => {
  const CustomHandle: React.FC = () => {
    return (
      <div
        style={{
          width: props.portrait ? '100%' : '0.25rem',
          height: props.portrait ? '0.25rem' : '100%',
          backgroundImage: `linear-gradient(
            ${props.portrait ? 'to left' : 'to bottom'},
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 154, 0, 1) 10%,
            rgba(208, 222, 33, 1) 20%,
            rgba(79, 220, 74, 1) 30%,
            rgba(63, 218, 216, 1) 40%,
            rgba(47, 201, 226, 1) 50%,
            rgba(28, 127, 238, 1) 60%,
            rgba(95, 21, 242, 1) 70%,
            rgba(186, 12, 248, 1) 80%,
            rgba(251, 7, 217, 1) 90%,
            rgba(255, 0, 0, 1) 100%
        )`,
          boxShadow: `0 0 0 2px rgba(148,0,211,1),
        0 0 2px 4px rgba(75,0,130,1),
        0 0 0 6px rgba(0,0,255,1),
        0 0 0 8px rgba(0,255,0,1),
        0 0 0 10px rgba(255,255,0,1),
        0 0 0 12px rgba(255,127,0,1),
        0 0 0 14px rgba(255,0,0,1)`,
          cursor: 'pointer',
        }}
      />
    );
  };

  return (
    <ReactCompareSlider
      {...props}
      handle={<CustomHandle />}
      itemOne={
        <ReactCompareSliderImage
          src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/space-needle-1.jpg"
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/space-needle-2.jpg"
          alt="Image two"
        />
      }
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

Handle.args = {};

export const BoundsPadding: StoryObj<ReactCompareSliderDetailedProps> = ({
  boundsPadding = 80,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...props}
        boundsPadding={boundsPadding}
        itemOne={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/london-eye-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/london-eye-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

BoundsPadding.args = { boundsPadding: 80 };

export const OnPositionChange: StoryObj<ReactCompareSliderDetailedProps> = (props) => {
  const onPositionChange = React.useCallback((position) => {
    console.log('[OnPositionChange.onPositionChange]', position);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 16 }}>
      <div className="sb-custom-note">
        <em>Note:</em> This demo will be slightly laggy when viewing the action logging output in
        Storybook Actions tab.
      </div>

      <ReactCompareSlider
        {...props}
        onPositionChange={onPositionChange}
        itemOne={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/bangor-pier-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/bangor-pier-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

OnPositionChange.args = {};

export const OnlyHandleDraggable: StoryObj<ReactCompareSliderDetailedProps> = ({
  onlyHandleDraggable = true,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...props}
        onlyHandleDraggable={onlyHandleDraggable}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/dark-hedges-landscape-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/dark-hedges-landscape-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

OnlyHandleDraggable.args = { onlyHandleDraggable: true };

export const Portrait: StoryObj<ReactCompareSliderDetailedProps> = ({
  portrait = true,
  ...props
}) => (
  <ReactCompareSlider
    portrait={portrait}
    {...props}
    itemOne={
      <ReactCompareSliderImage
        src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/space-needle-1.jpg"
        alt="Image one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/space-needle-2.jpg"
        alt="Image two"
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);

Portrait.args = { portrait: true };

export const Position: StoryObj<ReactCompareSliderDetailedProps> = ({
  position = 25,
  ...props
}) => (
  <ReactCompareSlider
    {...props}
    position={position}
    itemOne={
      <ReactCompareSliderImage
        src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/bangor-marina-1-min.jpg"
        alt="Image one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/bangor-marina-2-min.jpg"
        alt="Image two"
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);

Position.args = { position: 25 };

export const ChangePositionOnHover: StoryObj<ReactCompareSliderDetailedProps> = ({
  changePositionOnHover = true,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...props}
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

ChangePositionOnHover.args = { changePositionOnHover: true };

export const KeyboardIncrement: StoryObj<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div className="sb-custom-note">
        <em>Info:</em> Click the slider handle then use the keyboard arrows to change the slider
        position.
      </div>

      <ReactCompareSlider
        {...props}
        itemOne={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/bangor-pier-2.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/bangor-pier-1.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

KeyboardIncrement.args = {};

export const UseReactCompareSliderRef: Story<ReactCompareSliderDetailedProps> = (props) => {
  // We need to know which slider is in control to avoid infinite loops 🤯
  const [sliderInControl, setSliderInControl] = React.useState(1);
  const slider1Ref = useReactCompareSliderRef();
  const slider2Ref = useReactCompareSliderRef();

  const handlePosition1Change = React.useCallback(
    (position: number) => {
      if (sliderInControl === 1) {
        slider2Ref.current?.setPosition(position);
      }
    },
    [slider2Ref, sliderInControl],
  );

  const handlePosition2Change = React.useCallback(
    (position: number) => {
      if (sliderInControl === 2) {
        slider1Ref.current?.setPosition(position);
      }
    },
    [slider1Ref, sliderInControl],
  );

  return (
    <>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <ReactCompareSlider
          {...props}
          data-testid={`${ROOT_TEST_ID}-1`}
          ref={slider1Ref}
          onFocus={() => setSliderInControl(1)}
          onPointerDown={() => setSliderInControl(1)}
          onPositionChange={handlePosition1Change}
          itemOne={
            <ReactCompareSliderImage
              src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-1-min.jpg"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-2-min.jpg"
              alt="Image two"
            />
          }
          style={{ width: '50%' }}
        />
        <ReactCompareSlider
          {...props}
          data-testid={`${ROOT_TEST_ID}-2`}
          ref={slider2Ref}
          onFocus={() => setSliderInControl(2)}
          onPointerDown={() => setSliderInControl(2)}
          onPositionChange={handlePosition2Change}
          itemOne={
            <ReactCompareSliderImage
              src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-1-min.jpg"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/seattle-2-min.jpg"
              alt="Image two"
            />
          }
          style={{ width: '50%' }}
        />

        <button
          type="button"
          onClick={() => {
            slider1Ref.current.setPosition(props.position!);
            slider2Ref.current.setPosition(props.position!);
          }}
          style={{
            position: 'absolute',
            left: '50%',
            fontSize: '1.5rem',
            transform: 'translateX(-50%)',
          }}
        >
          Reset sliders to <code>position</code> value ({props.position})
        </button>
      </div>
    </>
  );
};

UseReactCompareSliderRef.args = {};
