import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';

import { Template, getArgs } from './test-utils.test';

export default {
  title: 'Tests/Browser/RightToLeft',
} as Meta;

/** Test RTL rendering. */
export const RightToLeft: typeof Template = (args) => (
  <div dir="rtl">
    <Template {...args} />
  </div>
);

RightToLeft.args = getArgs({ style: { width: 200, height: 200 }, position: 25 });

RightToLeft.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(RightToLeft.args?.['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Should position slider at 25%.
  const slider = canvas.getByRole('slider') as HTMLElement;
  const sliderRect = slider.getBoundingClientRect();
  expect(sliderRect.left + sliderRect.width / 2).toBe(50);
};
