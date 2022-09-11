import { jest, expect } from '@storybook/jest';
import type { Meta, Story } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
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

  // On click.
  userEvent.click(rootComponent, {
    clientX: rootComponent.clientWidth * 0.25,
    clientY: rootComponent.clientHeight * 0.25,
  });

  await waitFor(() => expect(Default.args.onPositionChange).toHaveBeenLastCalledWith(25));
};

/** Test `handle`. */
export const CustomHandle = Template.bind({});

CustomHandle.args = getArgs({
  handle: <ReactCompareSliderHandle data-testid="handlearoo" />,
});

CustomHandle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  waitFor(() => expect(canvas.queryByTestId('handlearoo')).toBeInTheDocument());
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
