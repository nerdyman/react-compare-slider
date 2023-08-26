import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';

import { Template, getArgs } from './test-utils.test';

export default {
  title: 'Tests/Browser/Initial Position',
} as Meta;

export const StartAt0 = Template.bind({});
StartAt0.args = getArgs({ position: 0 });

StartAt0.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(StartAt100.args?.['data-testid']) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('0'));
};

export const StartAt100 = Template.bind({});
StartAt100.args = getArgs({ position: 100 });

StartAt100.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(StartAt100.args?.['data-testid']) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100'));
};
