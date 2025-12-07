import type { Meta, StoryFn } from '@storybook/react-vite';
import { useEffect } from 'react';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
  useReactCompareSliderRef,
} from 'react-compare-slider';

import { args, argTypes } from '../config';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Handles',
  component: ReactCompareSlider,
  args,
  argTypes,
};
export default meta;

export const InheritedColor: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={<ReactCompareSliderHandle portrait={portrait} style={{ color: 'yellow' }} />}
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const IndividualStyles: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        portrait={portrait}
        buttonStyle={{
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          backgroundColor: 'white',
          color: '#444',
          boxShadow: undefined,
          border: 0,
        }}
        linesStyle={{ opacity: 0.5 }}
      />
    }
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const HideButton: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        portrait={portrait}
        buttonStyle={{ display: 'none' }}
        // Make lines thicker so they're easier to grab.
        linesStyle={{ width: portrait ? '100%' : 4, height: portrait ? 4 : '100%' }}
      />
    }
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const HideLines: StoryFn<ReactCompareSliderProps> = ({ portrait, ...props }) => (
  <ReactCompareSlider
    {...props}
    portrait={portrait}
    handle={
      <ReactCompareSliderHandle
        portrait={portrait}
        buttonStyle={{
          border: 0,
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          boxShadow: 'none',
        }}
        linesStyle={{ opacity: 0 }}
      />
    }
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
    style={{ width: '100%', height: '100vh' }}
  />
);

export const OverrideHandleContainerClick: StoryFn<ReactCompareSliderProps> = (props) => {
  const reactCompareSliderRef = useReactCompareSliderRef();

  useEffect(() => {
    const containerClick = (ev: MouseEvent) => {
      const container = ev.currentTarget as HTMLButtonElement;

      ev.preventDefault();
      ev.stopImmediatePropagation();
      container.focus({ preventScroll: true });
      container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleContainer = reactCompareSliderRef.current.handleContainer!;

    handleContainer?.addEventListener('click', containerClick, { capture: true });

    return () => {
      handleContainer?.removeEventListener('click', containerClick, { capture: true });
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10vh' }}>
      <div style={{ padding: '1rem' }}>
        <button>Click me, then click the slider handle</button>
        <p>
          The <code>useReactCompareSliderRef</code> hook exposes the <code>handleContainer</code> property
          which points to the <code>button</code> element that contains the <code>handle</code>. By default,
          when the <code>handleContainer</code> or any elements within it are clicked, it focuses the{' '}
          <code>handleContainer</code> and moves the slider into view. This is for accessibility but you can
          override the behaviour as needed. In this example, instead of plainly focusing the slider, it
          focuses and smooth scrolls it into view.
        </p>

        <p>
          Note that this only occurs when the&nbsp;
          <code>handleContainer</code> or elements within the <code>handleContainer</code> are clicked. This
          is to allow custom <code>itemOne|itemTwo</code> components to be interacted with without the slider
          stealing focus.
        </p>
      </div>
      <ReactCompareSlider
        {...props}
        ref={reactCompareSliderRef}
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
        style={{ width: '100%', minHeight: '100vh' }}
      />
    </div>
  );
};

OverrideHandleContainerClick.args = {};
