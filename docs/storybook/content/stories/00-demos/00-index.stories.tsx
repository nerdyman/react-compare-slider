import type { Meta, StoryFn } from '@storybook/react-vite';
import React, { useState } from 'react';
import {
  ReactCompareSlider,
  type ReactCompareSliderDetailedProps,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import * as Slider from 'react-compare-slider/components';
import { useReactCompareSlider } from 'react-compare-slider/hooks';
import { createPortal } from 'react-dom';

import { args, argTypes } from '../config';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Demos',
  component: ReactCompareSlider,
  args,
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

export const Images: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
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
  );
};

Images.args = {
  style: {
    width: '100%',
    backgroundColor: 'white',
    backgroundImage: `
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
    backgroundSize: `20px 20px`,
    backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
  },
};

export const BoundsPadding: StoryFn<ReactCompareSliderDetailedProps> = ({
  boundsPadding = '5%',
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...props}
        boundsPadding={boundsPadding}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/london-eye-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/london-eye-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

BoundsPadding.args = { boundsPadding: '5%' };

export const BrowsingContext: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [browsingContext, setBrowsingContext] = useState<WindowProxy | null>(null);

  return (
    <div>
      <button onClick={() => setBrowsingContext(window.open('', '', 'popup,width=200,height=200'))}>
        Render in popup
      </button>
      {browsingContext &&
        createPortal(
          <ReactCompareSlider
            {...props}
            itemOne={
              <ReactCompareSliderImage
                src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/london-eye-1.jpg"
                alt="Image one"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/london-eye-2.jpg"
                alt="Image two"
              />
            }
            browsingContext={browsingContext || undefined}
          />,
          browsingContext.document.body,
        )}
    </div>
  );
};

BrowsingContext.args = {};

export const ChangePositionOnHover: StoryFn<ReactCompareSliderDetailedProps> = ({
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
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-skyline-2.jpg"
            alt="Image one"
            style={{ filter: 'contrast(200%) grayscale(1)' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-skyline-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

ChangePositionOnHover.args = { changePositionOnHover: true };

export const Clip: StoryFn<ReactCompareSliderDetailedProps> = ({ disabled, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...props}
        disabled={disabled}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/kilroy-1.svg"
            alt="Image one"
            style={{ objectPosition: 'bottom left' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/kilroy-2.svg"
            alt="Image two"
            style={{ objectPosition: 'bottom right' }}
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

Clip.args = { clip: 'itemTwo' };

export const Disabled: StoryFn<ReactCompareSliderDetailedProps> = ({ disabled, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <ReactCompareSlider
        {...props}
        disabled={disabled}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/london-eye-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/london-eye-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

Disabled.args = { disabled: true };

export const Handle: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
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
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-space-needle-1.jpg"
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-space-needle-2.jpg"
          alt="Image two"
        />
      }
      style={{ width: '100%', height: '100%' }}
    />
  );
};

Handle.args = {};

export const KeyboardIncrement: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div className="sb-custom-note">
        <em>Info:</em> Click the slider handle then use the keyboard arrows to change the slider position.
      </div>

      <ReactCompareSlider
        {...props}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/bangor-pier-2.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/bangor-pier-1.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

KeyboardIncrement.args = {};

export const OnlyHandleDraggable: StoryFn<ReactCompareSliderDetailedProps> = ({
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

export const OnPositionChange: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const onPositionChange: NonNullable<ReactCompareSliderDetailedProps['onPositionChange']> =
    React.useCallback((position) => {
      console.log('[OnPositionChange.onPositionChange]', position);
    }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 16 }}>
      <div className="sb-custom-note">
        <em>Note:</em> This demo will be slightly laggy when viewing the action logging output in Storybook
        Actions tab.
      </div>

      <ReactCompareSlider
        {...props}
        onPositionChange={onPositionChange}
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/bangor-pier-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/bangor-pier-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', flexGrow: 1 }}
      />
    </div>
  );
};

OnPositionChange.args = {};

export const Portrait: StoryFn<ReactCompareSliderDetailedProps> = ({ portrait = true, ...props }) => (
  <ReactCompareSlider
    portrait={portrait}
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
);

Portrait.args = {
  portrait: true,
  style: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    backgroundImage: `
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
    backgroundSize: `20px 20px`,
    backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
  },
};

export const Transition: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [position, setPosition] = React.useState(props.defaultPosition);

  React.useEffect(() => {
    const transitionDuration = Number.parseInt(props.transition?.split(' ')[0]!);
    const delayMs = Number.isNaN(transitionDuration) ? 350 : transitionDuration * 1000;
    const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const positions = [90, 10, 50];

    const fireTransition = async () => {
      for (const pos of positions) {
        setPosition(pos);
        await wait(delayMs);
      }
    };

    fireTransition();
  }, [props.transition]);

  React.useEffect(() => {
    return () => {
      setPosition(props.defaultPosition);
    };
  }, [props.defaultPosition]);

  return (
    <ReactCompareSlider
      {...props}
      defaultPosition={position}
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
  );
};

Transition.args = {
  defaultPosition: 50,
  transition: '0.35s ease-in-out',
  style: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    backgroundImage: `
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
    backgroundSize: `20px 20px`,
    backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
  },
};

export const DefaultPosition: StoryFn<ReactCompareSliderDetailedProps> = ({
  defaultPosition = 25,
  ...props
}) => (
  <ReactCompareSlider
    {...props}
    defaultPosition={defaultPosition}
    itemOne={
      <ReactCompareSliderImage
        src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-skyline-1.jpg"
        alt="Image one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-skyline-2.jpg"
        alt="Image two"
      />
    }
    style={{ width: '100%', height: '100%' }}
  />
);

DefaultPosition.args = { defaultPosition: 25 };

export const CustomSlider: StoryFn<Slider.ProviderProps & { style?: React.CSSProperties }> = ({
  style,
  ...props
}) => {
  const [pointerDownActive, setPointerDownActive] = React.useState<string>('not fired');

  // Destructure the props you want to manipulate.
  const {
    isDragging,
    canTransition,
    onPointerDown,
    onPointerUp,
    setPosition,
    setPositionFromBounds,
    ...sliderProps
  } = useReactCompareSlider(props);

  /**
   * Override the default pointerdown event handler.
   */
  const customPointerDown: typeof onPointerDown = React.useCallback(
    (ev) => {
      console.log('customPointerDown', ev);
      setPointerDownActive('true');

      // Always call the original event handler, you can do this wherever you want in your custom handler.
      onPointerDown(ev);
    },
    [onPointerDown],
  );

  /**
   * Override the default pointerup event handler.
   */
  const customPointerUp: typeof onPointerUp = React.useCallback(
    (ev) => {
      console.log('customPointerUp', ev);
      setPointerDownActive('false');

      // Always call the original event handler, you can do this wherever you want in your custom handler.
      onPointerUp(ev);
    },
    [onPointerUp],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '100%',
        height: '100%',
        maxHeight: '100dvh',
        paddingTop: '0.5rem',
        overflow: 'hidden',
        backgroundColor: 'white',
        color: 'black',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 0.5rem',
        }}
      >
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            listStyle: 'none',
            padding: '0 0.5rem',
            margin: 0,
          }}
        >
          <li>Pointer down: {pointerDownActive}</li>
          <li>Is dragging: {isDragging ? 'true' : 'false'}</li>
          <li>Can transition: {canTransition ? 'true' : 'false'}</li>
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button onClick={() => setPosition(sliderProps.defaultPosition)}>Reset position</button>
          <button onClick={() => setPosition(75)}>Set position to 75%</button>
          <button onClick={() => setPositionFromBounds({ x: 100, y: 100 })}>
            Set position by bounds (100px)
          </button>
        </div>
      </div>

      <Slider.Provider
        {...sliderProps}
        isDragging={isDragging}
        canTransition={canTransition}
        onPointerDown={customPointerDown}
        onPointerUp={customPointerUp}
        setPosition={setPosition}
        setPositionFromBounds={setPositionFromBounds}
      >
        <Slider.Root
          style={{
            flexGrow: 1,
            flexShrink: 1,
            minHeight: 0,
            backgroundImage: `
              linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
            backgroundSize: `20px 20px`,
            backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
          }}
        >
          <Slider.Item item="itemOne">
            <Slider.Image
              src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
              alt="Image one"
            />
          </Slider.Item>
          <Slider.Item item="itemTwo">
            <Slider.Image
              src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
              alt="Image two"
            />
          </Slider.Item>
          <Slider.HandleRoot>
            <Slider.Handle />
          </Slider.HandleRoot>
        </Slider.Root>
      </Slider.Provider>
    </div>
  );
};

CustomSlider.args = {
  transition: '0.15s linear',
};
