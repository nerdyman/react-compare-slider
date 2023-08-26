import { expect } from '@storybook/jest';
import type { Meta, StoryFn } from '@storybook/react';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

export default {
  title: 'Tests/Browser/Pointer Interactions',
} as Meta;

export const PointerMovementWithinBounds = Template.bind({ style: { width: 200, height: 200 } });
PointerMovementWithinBounds.args = getArgs({ style: { width: 200, height: 200 } });

PointerMovementWithinBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(
    PointerMovementWithinBounds.args?.['data-testid'],
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('75'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(75),
  );

  fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth,
    clientY: sliderRoot.clientHeight,
  });

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(100),
  );

  fireEvent.pointerDown(sliderRoot, {
    clientX: 10,
    clientY: 10,
  });

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
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(
    PointerMovementOutsideBounds.args?.['data-testid'],
  ) as Element;

  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await waitFor(() => {
    // expect(document.activeElement).toBe(canvas.getByRole('slider'));
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('75');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(75);
  });

  console.log('!!!', sliderRoot);

  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mouse the pointer outside of the slider.
  fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 1.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(100);
  });

  // Move it back now y'all.
  fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  fireEvent.pointerUp(sliderRoot);

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(50);
  });
};

export const ChangePositionOnHover: StoryFn<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ width: 400, height: 400, backgroundColor: 'red' }}>
      <ReactCompareSlider {...props} />
    </div>
  );
};
ChangePositionOnHover.args = getArgs({
  changePositionOnHover: true,
  style: { width: 200, height: 200 },
});

/**
 * Test using `changePositionOnHover` while pointer has been pressed while dragging outside of the
 * container.
 */
ChangePositionOnHover.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(ChangePositionOnHover.args?.['data-testid']) as Element;

  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.5,
    clientY: sliderRoot.clientHeight * 0.5,
  });

  // Mouse the pointer outside of the slider.
  fireEvent.pointerMove(sliderRoot, {
    clientX: sliderRoot.clientWidth * 1.5,
    clientY: sliderRoot.clientHeight * 1.5,
  });

  fireEvent.pointerLeave(sliderRoot);

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(100);
  });
};
