import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';
import { ReactCompareSlider, type ReactCompareSliderProps } from 'react-compare-slider';
import * as Slider from 'react-compare-slider/components';
import { useReactCompareSlider } from 'react-compare-slider/hooks';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta = {
  title: 'Tests/Browser/ZeroBounds',
};
export default meta;

/** Rendering items with no width or height. */
export const ZeroBounds: StoryFn<ReturnType<typeof useReactCompareSlider>> = () => {
  const sliderProps = useReactCompareSlider();

  return (
    <div>
      <button onClick={() => sliderProps.setPositionFromBounds({ x: 100, y: 100 })}>
        Set position from bounds
      </button>
      <button onClick={() => sliderProps.setPosition(75)}>Set position</button>
      <Slider.Provider {...sliderProps}>
        <Slider.Root>
          <Slider.Item item="itemOne">
            <div data-testid="one" />
          </Slider.Item>
          <Slider.Item item="itemTwo">
            <div data-testid="two" />
          </Slider.Item>
          <Slider.HandleRoot>
            <Slider.Handle />
          </Slider.HandleRoot>
        </Slider.Root>
      </Slider.Provider>
    </div>
  );
};

ZeroBounds.play = async ({ canvasElement, step, userEvent }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider');

  await step('Should have elements on mount', async () => {
    await waitFor(() => expect(slider).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('one')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('two')).toBeInTheDocument());
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  });

  await step('Set position from bounds', async () => {
    await userEvent.click(await canvas.findByText('Set position from bounds'));
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  });

  await step('Set position', async () => {
    await userEvent.click(await canvas.findByText('Set position'));
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('75'));
  });
};

/**
 * Rendering items with no width or height the change them to images after rendering.
 */
export const ZeroBoundsWithLazyContent: StoryFn = () => {
  const [dir, setDir] = useState('ltr');
  const [props, setProps] = useState<ReactCompareSliderProps>({
    defaultPosition: 50,
    portrait: true,
    itemOne: <div data-testid="one" />,
    itemTwo: <div data-testid="two" />,
  });

  const loadContent = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProps((prev) => ({
      ...prev,
      position: 100,
      itemOne: (
        <img
          data-testid="one"
          alt="one"
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png"
          style={{ display: 'block', width: 128, height: 128, objectFit: 'cover' }}
        />
      ),
      itemTwo: (
        <img
          data-testid="two"
          alt="two"
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-2.png"
          style={{ display: 'block', width: 128, height: 128, objectFit: 'cover' }}
        />
      ),
    }));
  };

  return (
    <div dir={dir} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8, direction: 'ltr' }}>
        <button onClick={loadContent}>Load content</button>
        <button onClick={() => setProps((prev) => ({ ...prev, portrait: !prev.portrait }))}>
          Toggle portrait
        </button>
        <button onClick={() => setDir((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'))}>Toggle direction</button>
      </div>
      <ReactCompareSlider {...props} />
    </div>
  );
};

ZeroBoundsWithLazyContent.play = async ({ canvasElement, step }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');
  const loadImages = await canvas.findByText('Load content');
  const togglePortrait = await canvas.findByText('Toggle portrait');
  const toggleDirection = await canvas.findByText('Toggle direction');

  step('Zero bounds', async () => {
    await waitFor(() => expect(canvas.getByTestId('one')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('two')).toBeInTheDocument());
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).width)).toBe(0));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).height)).toBe(0));
  });

  step('Load images', async () => {
    await user.click(loadImages);
    await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument(), { timeout: 3000 });
    await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).translate)).toBe('0px 50%'));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).width)).toBe(128));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).height)).toBe(128));
  });

  step('Toggle portrait', async () => {
    await user.click(togglePortrait);
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).translate)).toBe('50% 0px'));
  });

  step('Toggle direction', async () => {
    await user.click(toggleDirection);
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
    await waitFor(() => expect(parseInt(window.getComputedStyle(slider).translate)).toBe('50% 0px'));
  });
};
