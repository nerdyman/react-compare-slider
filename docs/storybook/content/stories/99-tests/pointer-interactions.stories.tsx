import { expect } from '@storybook/jest';
import type { Meta, Story } from '@storybook/react';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderDetailedProps } from 'react-compare-slider';

import { Template, getArgs } from './utils';

export default {
  title: 'Tests/E2E/Pointer Interactions',
} as Meta;

export const PointerMovementWithinBounds = Template.bind({ style: { width: 200, height: 200 } });
PointerMovementWithinBounds.args = getArgs({ style: { width: 200, height: 200 } });

PointerMovementWithinBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(
    PointerMovementWithinBounds.args?.['data-testid'],
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());

  userEvent.click(rootComponent, {
    clientX: rootComponent.clientWidth * 0.75,
    clientY: rootComponent.clientHeight * 0.75,
  });

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('75'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(75),
  );

  userEvent.click(rootComponent, {
    clientX: rootComponent.clientWidth,
    clientY: rootComponent.clientHeight,
  });

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(100),
  );

  userEvent.click(rootComponent, {
    clientX: 10,
    clientY: 10,
  });

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('5'));
  await waitFor(() =>
    expect(PointerMovementWithinBounds.args?.onPositionChange).toHaveBeenCalledWith(5),
  );
};

export const PointerMovementOutsideBounds: Story<ReactCompareSliderDetailedProps> = (props) => {
  return (
    <div style={{ width: 400, height: 200, backgroundColor: 'red' }}>
      <ReactCompareSlider {...props} />
    </div>
  );
};
PointerMovementOutsideBounds.args = getArgs({ style: { width: 200, height: 200 } });

PointerMovementOutsideBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(
    PointerMovementOutsideBounds.args?.['data-testid'],
  ) as Element;

  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());

  fireEvent.pointerDown(rootComponent, {
    clientX: rootComponent.clientWidth * 0.5,
    clientY: rootComponent.clientHeight * 0.5,
  });

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  // Mouse the pointer outside of the slider.
  fireEvent.pointerMove(rootComponent, {
    clientX: rootComponent.clientWidth * 1.5,
    clientY: rootComponent.clientHeight / 2,
  });

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(100);
  });

  // Move it back now y'all.
  fireEvent.pointerMove(rootComponent, {
    clientX: rootComponent.clientWidth * 0.5,
    clientY: rootComponent.clientHeight / 2,
  });

  fireEvent.pointerUp(rootComponent);

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(PointerMovementOutsideBounds.args?.onPositionChange).toHaveBeenCalledWith(50);
  });
};

export const ChangePositionOnHover: Story<ReactCompareSliderDetailedProps> = (props) => {
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
  const rootComponent = canvas.queryByTestId(
    ChangePositionOnHover.args?.['data-testid'],
  ) as Element;

  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());

  fireEvent.pointerMove(rootComponent, {
    clientX: rootComponent.clientWidth * 0.5,
    clientY: rootComponent.clientHeight * 0.5,
  });

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(50);
  });

  fireEvent.pointerDown(rootComponent, {
    clientX: rootComponent.clientWidth * 0.5,
    clientY: rootComponent.clientHeight * 0.5,
  });

  // Mouse the pointer outside of the slider.
  fireEvent.pointerMove(rootComponent, {
    clientX: rootComponent.clientWidth * 1.5,
    clientY: rootComponent.clientHeight * 1.5,
  });

  fireEvent.pointerLeave(rootComponent);

  await waitFor(() => {
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100');
    expect(ChangePositionOnHover.args?.onPositionChange).toHaveBeenCalledWith(100);
  });
};
