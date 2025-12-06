import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSlider, ReactCompareSliderProps } from 'react-compare-slider';
import { expect, fireEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestComponent } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Scroll',
};
export default meta;

/** Horizontal slider in landscape mode. */
export const Horizontal: StoryFn<ReactCompareSliderProps> = (props) => (
  <div
    style={{
      display: 'flex',
      width: 200,
      height: 200,
      padding: 8,
      overflowX: 'auto',
      background: 'red',
    }}
  >
    <div
      style={{
        flexShrink: 0,
        width: 200,
        height: '100%',
        background: 'red',
        color: 'white',
      }}
    >
      Scroll right
    </div>
    <TestComponent {...props} />
  </div>
);
Horizontal.args = getArgs({
  style: { width: 200, height: '100%', flexShrink: 0 },
});

Horizontal.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);
  const slider = await canvas.findByRole('slider');

  // Should have elements on mount.
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));

  // Scroll to slider.
  sliderRoot.scrollIntoView();
  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: 166,
    clientY: 100,
  }),
    // Should match new position.
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('75'));
};

/** Vertical slider in portrait mode. */
export const VerticalPortrait: StoryFn<ReactCompareSliderProps> = (props) => (
  <div style={{ width: 200, height: 200, overflowY: 'auto', padding: 8, background: 'red' }}>
    <div style={{ width: '100%', height: 150, background: 'red', color: 'white' }}>Scroll down</div>
    <TestComponent {...props} />
  </div>
);
VerticalPortrait.args = getArgs({ portrait: true, style: { width: '100%', height: 200 } });

VerticalPortrait.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);
  const slider = await canvas.findByRole('slider');

  // Should have elements on mount.
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));

  // Scroll to slider.
  sliderRoot.scrollIntoView();
  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: 100,
    clientY: 158,
  });

  // Should match new position.
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('75'));
};
