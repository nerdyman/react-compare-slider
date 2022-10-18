import { jest, expect } from '@storybook/jest';
import type { Meta, Story } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';

import {
  ReactCompareSlider,
  ReactCompareSliderHandle as BaseReactCompareSliderHandle,
  ReactCompareSliderImage as BaseReactCompareSliderImage,
  ReactCompareSliderDetailedProps,
  styleFitContainer,
} from '../../src';

export default {
  title: 'Tests/E2E',
} as Meta;

const getArgs = (args: Partial<ReactCompareSliderDetailedProps> = {}) => ({
  'data-testid': 'rcs-root',
  onPositionChange: jest.fn(console.log),
  style: { width: '100%', height: '100vh' },
  itemOne: (
    <BaseReactCompareSliderImage
      src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png"
      alt="one"
    />
  ),
  itemTwo: (
    <BaseReactCompareSliderImage
      src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-2.png"
      alt="two"
    />
  ),
  ...args,
});

const Template: Story<ReactCompareSliderDetailedProps> = (args) => (
  <ReactCompareSlider {...args} />
);

/** Test default props. */
export const Default = Template.bind({});
Default.args = getArgs();

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(Default.args['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());

  // Should have initial position on mount.
  await waitFor(() => expect(Default.args.onPositionChange).toHaveBeenLastCalledWith(50));
};

/** Test Touch/Mouse move. */
export const PointerMovement = Template.bind({});
// Using fixed bounds to ensure callback positions are exact.
PointerMovement.args = getArgs({ style: { width: 200, height: 200 } });

PointerMovement.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(
    PointerMovement.args['data-testid']
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());

  userEvent.click(rootComponent, {
    clientX: rootComponent.clientWidth * 0.75,
    clientY: rootComponent.clientHeight * 0.75,
  });

  await waitFor(() =>
    expect(PointerMovement.args.onPositionChange).toHaveBeenCalledWith(75)
  );

  userEvent.click(rootComponent, {
    clientX: rootComponent.clientWidth,
    clientY: rootComponent.clientHeight,
  });

  await waitFor(() =>
    expect(PointerMovement.args.onPositionChange).toHaveBeenCalledWith(100)
  );

  userEvent.click(rootComponent, {
    clientX: 0,
    clientY: 0,
  });

  await waitFor(() =>
    expect(PointerMovement.args.onPositionChange).toHaveBeenCalledWith(0)
  );
};

/** Test arrow key presses and clicks on focused handle. */
export const HandleInteractions = Template.bind({});
// Using fixed bounds to ensure callback positions are exact.
HandleInteractions.args = getArgs({ style: { width: 200, height: 200 } });

HandleInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(
    HandleInteractions.args['data-testid']
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());

  // Focus the handle with tab key.
  userEvent.tab();

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe(
    'handle-container'
  );

  // Unfocus the handle with tab key.
  userEvent.tab({ shift: true });

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).not.toBe(
    'handle-container'
  );

  // Focus the handle with mouse click.
  userEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe(
    'handle-container'
  );

  // Move handle right.
  userEvent.keyboard('{ArrowRight}');

  await waitFor(() =>
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55')
  );

  // Move handle Left.
  userEvent.keyboard('{ArrowLeft}');

  await waitFor(() =>
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50')
  );

  // Move handle Right.
  userEvent.keyboard('{ArrowUp}');

  await waitFor(() =>
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55')
  );

  // Move handle Left.
  userEvent.keyboard('{ArrowDown}');

  await waitFor(() =>
    expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50')
  );
};

/** Test `handle`. */
export const ReactCompareSliderHandle = Template.bind({});

ReactCompareSliderHandle.args = getArgs({
  handle: (
    <BaseReactCompareSliderHandle data-testid="handlearoo" style={{ color: 'red' }} />
  ),
});

ReactCompareSliderHandle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const handle = canvas.queryByTestId('handlearoo');

  waitFor(() => expect(handle).toBeInTheDocument());

  // Lines should inherit color.
  waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-line') as HTMLElement)
        .backgroundColor
    ).toBe('rgb(255, 0, 0)')
  );

  // Button should inherit color.
  waitFor(() =>
    expect(
      window.getComputedStyle(
        handle?.querySelector('.__rcs-handle-button') as HTMLElement
      ).color
    ).toBe('rgb(255, 0, 0)')
  );

  // Arrows should inherit color.
  waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-arrow') as HTMLElement)
        .color
    ).toBe('rgb(255, 0, 0)')
  );
};

/** Default image. */
export const ReactCompareSliderImage = (args) => (
  <BaseReactCompareSliderImage {...args} />
);

ReactCompareSliderImage.args = {
  alt: 'testaroo',
  src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png',
};

ReactCompareSliderImage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() =>
    expect(canvas.getByAltText(ReactCompareSliderImage.args.alt)).toBeInTheDocument()
  );

  // Ensure default styles have been applied to `ReactCompareSliderImage`.
  expect(canvas.getByAltText(ReactCompareSliderImage.args.alt).style).toMatchObject(
    styleFitContainer() as Record<string, unknown>
  );
};

/** Rendering items with no width or height. */
export const ZeroBounds = Template.bind({});
ZeroBounds.args = getArgs({
  style: { width: 'auto', height: 'auto' },
  itemOne: <div data-testid="one" />,
  itemTwo: <div data-testid="two" />,
});

ZeroBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(ZeroBounds.args['data-testid']) as Element;

  // Should have elements on mount and not crash.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('two')).toBeInTheDocument());
};
