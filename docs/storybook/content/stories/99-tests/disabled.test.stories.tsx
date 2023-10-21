import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Disabled',
};
export default meta;

export const Disabled: typeof Template = (args) => (
  <div>
    <button type="button" data-testid="test-button">
      Button
    </button>
    <Template {...args} />
  </div>
);

Disabled.args = getArgs({ style: { width: 200, height: 200 }, disabled: true });

Disabled.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(Disabled.args?.['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  const testButton = canvas.queryByTestId('test-button') as HTMLElement;

  // Slider should have disabled attribute.
  expect(canvas.getByRole('slider')).toBeDisabled();

  // Focus the test button.
  await user.click(testButton);
  expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Click on the canvas and move pointer - position and focused element should not be slider.
  await user.click(sliderRoot);
  expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Click on the handle and move pointer - position and focused element should not be slider.
  await user.click(canvas.getByRole('slider'));
  expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Click on the handle and press arrow key - position and focused element should not be slider.
  await user.click(canvas.getByRole('slider'));
  expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle right.
  await user.click(canvas.getByRole('slider'));
  await user.keyboard('{ArrowRight}');
  expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
};
