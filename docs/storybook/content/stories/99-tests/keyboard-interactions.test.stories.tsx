import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { Template, getArgs } from './utils';

export default {
  title: 'Tests/Browser/Keyboard Interactions',
} as Meta;

export const KeyboardInteractionsLandscape = Template.bind({});
KeyboardInteractionsLandscape.args = getArgs({ style: { width: 200, height: 200 } });

KeyboardInteractionsLandscape.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(
    KeyboardInteractionsLandscape.args['data-testid'],
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  userEvent.tab();

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container');

  // Unfocus the handle with tab key.
  userEvent.tab({ shift: true });

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).not.toBe(
    'handle-container',
  );

  // Focus the handle with mouse click.
  userEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle right.
  userEvent.keyboard('{ArrowRight}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55'));

  // Move handle Left.
  userEvent.keyboard('{ArrowLeft}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle Right.
  userEvent.keyboard('{ArrowUp}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55'));

  // Move handle Left.
  userEvent.keyboard('{ArrowDown}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};

export const KeyboardInteractionsPortrait = Template.bind({});
KeyboardInteractionsPortrait.args = getArgs({
  portrait: true,
  style: { width: 200, height: 200 },
});

KeyboardInteractionsPortrait.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(
    KeyboardInteractionsPortrait.args['data-testid'],
  ) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  userEvent.tab();

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container');

  // Unfocus the handle with tab key.
  userEvent.tab({ shift: true });

  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).not.toBe(
    'handle-container',
  );

  // Focus the handle with mouse click.
  userEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle right.
  userEvent.keyboard('{ArrowRight}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('45'));

  // Move handle Left.
  userEvent.keyboard('{ArrowLeft}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle Right.
  userEvent.keyboard('{ArrowUp}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('45'));

  // Move handle Left.
  userEvent.keyboard('{ArrowDown}');

  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};
