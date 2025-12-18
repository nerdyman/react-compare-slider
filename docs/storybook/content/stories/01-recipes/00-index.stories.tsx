import type { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderHandle, ReactCompareSliderImage } from 'react-compare-slider';

import { args, argTypes } from '../config';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Recipes',
  component: ReactCompareSlider,
  args,
  argTypes,
};
export default meta;

export const Autoplay: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!isPlaying) return;

    setSliderPosition((prev) => (prev === 0 ? 100 : 0));

    const interval = setInterval(() => {
      setSliderPosition((prev) => (prev === 0 ? 100 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <ReactCompareSlider
      {...props}
      defaultPosition={sliderPosition}
      transition={isPlaying ? '3s ease-in-out' : undefined}
      onPointerDown={() => setIsPlaying(false)}
      onPointerLeave={() => setIsPlaying(true)}
      itemOne={
        <ReactCompareSliderImage
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
          alt="Image one"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
          alt="Image two"
        />
      }
    />
  );
};

Autoplay.args = {
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

export const ItemLabels: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [labelOpacity, setLabelOpacity] = React.useState(1);

  const labelStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    position: 'absolute',
    padding: '1rem',
    color: 'white',
    opacity: labelOpacity,
    border: '2px solid white',
    borderRadius: '.5rem',
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    transition: 'opacity 0.25s ease-in-out',
  };

  return (
    <ReactCompareSlider
      {...props}
      onPointerDown={() => setLabelOpacity(0)}
      onPointerUp={() => setLabelOpacity(1)}
      itemOne={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'start',
          }}
        >
          <div style={labelStyle}>Left</div>
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-space-needle-1.jpg"
            alt="Image one"
          />
        </div>
      }
      itemTwo={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'end',
          }}
        >
          <div style={labelStyle}>Right</div>
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-space-needle-2.jpg"
            alt="Image two"
          />
        </div>
      }
    />
  );
};

ItemLabels.args = {
  style: {
    width: '100%',
    height: '100vh',
  },
};

export const HandleLabels: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  const [labelOpacity, setLabelOpacity] = React.useState(1);

  const labelStyle: React.CSSProperties = {
    fontSize: '.75rem',
    position: 'absolute',
    padding: '.25rem',
    color: 'white',
    opacity: labelOpacity,
    borderRadius: '.25rem',
    border: '1px solid white',
    backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.25s ease-in-out',
  };

  return (
    <ReactCompareSlider
      {...props}
      onPointerDown={() => setLabelOpacity(0)}
      onPointerUp={() => setLabelOpacity(1)}
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
      handle={
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <ReactCompareSliderHandle />
          <div style={{ ...labelStyle, translate: '-100% 0', left: 0 }}>Label 1</div>
          <div style={{ ...labelStyle, translate: '100% 0', right: 0 }}>Label 2</div>
        </div>
      }
    />
  );
};

HandleLabels.args = {
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
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
          alt="Image one"
          onLoad={() => setLoaded((prev) => prev + 1)}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          style={imagesStyle}
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
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

// export const ResetOnPointerLeave: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
//   const reactCompareSliderRef = useReactCompareSliderRef();

//   return (
//     <div style={{ display: 'flex', width: '100%', padding: '3rem' }}>
//       <ReactCompareSlider
//         {...props}
//         onPointerLeave={() => reactCompareSliderRef.current?.setPosition(props.position!)}
//         ref={reactCompareSliderRef}
//         itemOne={
//           <ReactCompareSliderImage
//             src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-space-needle-1.jpg"
//             alt="Image one"
//           />
//         }
//         itemTwo={
//           <ReactCompareSliderImage
//             src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/seattle-space-needle-2.jpg"
//             alt="Image two"
//           />
//         }
//       />
//       <button style={{ position: 'absolute', top: 0, left: 0 }}>Touch device focus trap</button>
//     </div>
//   );
// };

// ResetOnPointerLeave.args = {
//   style: {
//     width: '100%',
//   },
// };
