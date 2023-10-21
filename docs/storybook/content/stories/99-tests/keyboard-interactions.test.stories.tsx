import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Keyboard Interactions',
};
export default meta;

export const KeyboardInteractionsLandscape = Template.bind({});

KeyboardInteractionsLandscape.args = getArgs({ style: { width: 200, height: 200 } });

KeyboardInteractionsLandscape.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(
    KeyboardInteractionsLandscape.args?.['data-testid'],
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  await user.tab();

  expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container');

  // Unfocus the handle with tab key.
  await user.tab({ shift: true });
  expect(document.activeElement!.getAttribute('data-rcs')).not.toBe('handle-container');

  // Focus the handle with mouse click.
  fireEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle right.
  await user.keyboard('{ArrowRight}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55');

  // Move handle Left.
  await user.keyboard('{ArrowLeft}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle Right.
  await user.keyboard('{ArrowUp}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55');

  // Move handle Left.
  await user.keyboard('{ArrowDown}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
};

export const KeyboardInteractionsPortrait = Template.bind({});
KeyboardInteractionsPortrait.args = getArgs({
  portrait: true,
  style: { width: 200, height: 200 },
});

KeyboardInteractionsPortrait.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(
    KeyboardInteractionsPortrait.args?.['data-testid'],
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  await user.tab();

  expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container');

  // Unfocus the handle with tab key.
  await user.tab({ shift: true });

  expect(document.activeElement!.getAttribute('data-rcs')).not.toBe('handle-container');

  // Focus the handle with mouse click.
  fireEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle right.
  await user.keyboard('{ArrowRight}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('45');

  // Move handle Left.
  await user.keyboard('{ArrowLeft}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle Right.
  await user.keyboard('{ArrowUp}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('45');

  // Move handle Left.
  await user.keyboard('{ArrowDown}');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
};
