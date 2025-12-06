import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

import { getArgs, Template } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Keyboard Interactions',
};
export default meta;

export const KeyboardInteractionsLandscape = Template.bind({});

KeyboardInteractionsLandscape.args = getArgs({ style: { width: 200, height: 200 } });

KeyboardInteractionsLandscape.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(KeyboardInteractionsLandscape.args?.['data-testid'] as string)!;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  await user.tab();

  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container'));

  // Unfocus the handle with tab key.
  await user.tab({ shift: true });
  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).not.toBe('handle-container'));

  // Focus the handle with mouse click.
  await fireEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle right.
  await user.keyboard('{ArrowRight}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55'));

  // Move handle Left.
  await user.keyboard('{ArrowLeft}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle Right.
  await user.keyboard('{ArrowUp}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('55'));

  // Move handle Left.
  await user.keyboard('{ArrowDown}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};

export const KeyboardInteractionsPortrait = Template.bind({});
KeyboardInteractionsPortrait.args = getArgs({
  portrait: true,
  style: { width: 200, height: 200 },
});

KeyboardInteractionsPortrait.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(KeyboardInteractionsPortrait.args?.['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  await user.tab();

  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container'));

  // Unfocus the handle with tab key.
  await user.tab({ shift: true });

  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).not.toBe('handle-container'));

  // Focus the handle with mouse click.
  await fireEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle right.
  await user.keyboard('{ArrowRight}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('45'));

  // Move handle Left.
  await user.keyboard('{ArrowLeft}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle Right.
  await user.keyboard('{ArrowUp}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('45'));

  // Move handle Left.
  await user.keyboard('{ArrowDown}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};

export const KeyboardInteractionsPixel = Template.bind({});
KeyboardInteractionsPixel.args = getArgs({
  keyboardIncrement: 20,
  style: { width: 200, height: 200 },
});

KeyboardInteractionsPixel.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(KeyboardInteractionsPortrait.args?.['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Focus the handle with tab key.
  await user.tab();

  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).toBe('handle-container'));

  // Unfocus the handle with tab key.
  await user.tab({ shift: true });

  await waitFor(() => expect(document.activeElement!.getAttribute('data-rcs')).not.toBe('handle-container'));

  // Focus the handle with mouse click.
  await fireEvent.click(canvas.getByRole('slider'), { clientX: 100, clientY: 100 });
  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-rcs')).toBe('handle-container'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle right.
  await user.keyboard('{ArrowRight}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('60'));

  // Move handle Left.
  await user.keyboard('{ArrowLeft}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle Right.
  await user.keyboard('{ArrowUp}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('60'));

  // Move handle Left.
  await user.keyboard('{ArrowDown}');
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};
