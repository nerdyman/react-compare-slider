import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestComponent, type TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Disabled',
};
export default meta;

export const Disabled: typeof TestTemplate = (args) => (
  <div>
    <button type="button" data-testid="test-button">
      Button
    </button>
    <TestComponent {...args} />
  </div>
);

Disabled.args = getArgs({ style: { width: 200, height: 200 }, disabled: true });

Disabled.play = async ({ canvasElement, step }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);
  const testButton = canvas.queryByTestId('test-button') as HTMLElement;

  await step('Should be disabled', async () => {
    await waitFor(() => expect(canvas.getByRole('slider')).toHaveAttribute('aria-disabled', 'true'));
  });

  await step('Focus the test button', async () => {
    await user.click(testButton);
    await waitFor(() =>
      expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
    );
    await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
  });

  await step('Should not be able to focus the slider handle', async () => {
    await user.click(sliderRoot);
    await waitFor(() =>
      expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
    );
    await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
  });

  await step('Should not be able to move the slider handle', async () => {
    await user.click(sliderRoot);
    await waitFor(() =>
      expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
    );
    await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
  });

  await step('Should not be able to move the slider handle with the arrow keys', async () => {
    await user.click(sliderRoot);
    await user.keyboard('{ArrowRight}');
    await waitFor(() =>
      expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
    );
    await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
  });
};
