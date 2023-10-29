import { expect } from '@storybook/jest';
import type { Meta, StoryFn } from '@storybook/react';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Interactions',
};
export default meta;

export const PointerMovementWithinBounds = Template.bind({ style: { width: 200, height: 200 } });
PointerMovementWithinBounds.args = getArgs({ style: { width: 200, height: 200 } });
PointerMovementWithinBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = (await canvas.findByTestId(
    PointerMovementWithinBounds.args?.['data-testid'],
  )) as Element;

  // Should have elements on mount.
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('75'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(75),
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth,
    clientY: sliderRoot.clientHeight,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(100),
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: 10,
    clientY: 10,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('5'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(5),
  );
};

export const PointerMovementOutsideBounds: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ width: 400, height: 400, backgroundColor: 'red' }}>
      <ReactCompareSlider {...props} />
    </div>
  );
};
PointerMovementOutsideBounds.args = getArgs({ style: { width: 200, height: 200 } });
PointerMovementOutsideBounds.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = (await canvas.findByTestId(
    PointerMovementOutsideBounds.args?.['data-testid'],
  )) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  await user.pointer({
    target: sliderRoot,
    coords: {
      clientX: sliderRoot.clientWidth * 0.75,
      clientY: sliderRoot.clientHeight * 0.75,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('75');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(75);
  });

  // Mouse the pointer outside of the slider.
  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 1.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(100);
  });

  // Move it back now y'all.
  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerUp(sliderRoot);

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
  await waitFor(() =>
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(50),
  );
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
  position: 0,
  changePositionOnHover: true,
  style: { width: 200, height: 200 },
});
ChangePositionOnHover.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const slider = (await canvas.findByRole('slider')) as Element;
  const sliderRoot = (await canvas.findByTestId(
    ChangePositionOnHover.args?.['data-testid'],
  )) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  await user.click(slider);

  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  // Mouse the pointer outside of the slider.
  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 1.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerLeave(sliderRoot);

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(100);
  });
};

/**
 * Ensure slider position continues to update when pointer is down and moved outside of the root.
 */
export const ChangePositionOnHoverPointerDown: StoryFn<ReactCompareSliderDetailedProps> = (
  props,
) => {
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
  const sliderRoot = (await canvas.findByTestId(
    ChangePositionOnHoverPointerDown.args?.['data-testid'],
  )) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  await fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(ChangePositionOnHoverPointerDown.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

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

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(ChangePositionOnHoverPointerDown.args?.onPositionChange).toHaveBeenCalledWith(100);
  });
};
