import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider } from 'react-compare-slider';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Interactions',
};
export default meta;

export const PointerMovementWithinBounds = TestTemplate.bind({ style: { width: 200, height: 200 } });
PointerMovementWithinBounds.args = getArgs({ style: { width: 200, height: 200 } });
PointerMovementWithinBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('75'));
  await waitFor(() => expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(75));

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth,
    clientY: sliderRoot.clientHeight,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() => expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(100));

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: 10,
    clientY: 10,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('5'));
  await waitFor(() => expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(5));
};

/**
 * Ensure slider position stops when pointer is not down and moved outside of the root.
 */
export const ChangePositionOnHover: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ width: 400, height: 400, backgroundColor: 'red' }}>
      <ReactCompareSlider {...props} />
    </div>
  );
};
ChangePositionOnHover.args = getArgs({
  defaultPosition: 0,
  changePositionOnHover: true,
  style: { width: 200, height: 200 },
});
ChangePositionOnHover.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await user.click(slider);

  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  // Mouse the pointer outside of the slider.
  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 1.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerLeave(sliderRoot);

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(100);
  });
};

/**
 * Ensure slider position continues to update when pointer is down and moved outside of the root.
 */
export const ChangePositionOnHoverPointerDown: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ width: 400, height: 400, backgroundColor: 'red' }}>
      <ReactCompareSlider {...props} />
    </div>
  );
};
ChangePositionOnHoverPointerDown.args = getArgs({
  changePositionOnHover: true,
  style: { width: 200, height: 200 },
});
ChangePositionOnHoverPointerDown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(ChangePositionOnHoverPointerDown.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mouse the pointer outside of the slider.
  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 1.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerLeave(sliderRoot);

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(ChangePositionOnHoverPointerDown.args?.onPositionChange).toHaveBeenCalledWith(100);
  });
};

/**
 * Ensure slider 'disconnects' when it loses focus on touch devices.
 */
export const TouchEvents: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ width: 400, height: 400, backgroundColor: 'red' }}>
      <button>Clickaroo</button>
      <ReactCompareSlider {...props} />
    </div>
  );
};

TouchEvents.args = getArgs({
  changePositionOnHover: true,
  style: { width: 200, height: 200 },
});

TouchEvents.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  await new Promise((resolve) => setTimeout(resolve, 250));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.65,
    clientY: sliderRoot.clientHeight * 0.65,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => expect(sliderRoot).toHaveStyle({ cursor: 'ew-resize' }));

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.touchEnd(sliderRoot);

  await waitFor(() => expect(sliderRoot).toHaveStyle({ cursor: 'auto' }));
};
