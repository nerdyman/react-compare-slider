import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestComponent, TestTemplate } from './test-utils';

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

Disabled.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  const testButton = canvas.queryByTestId('test-button') as HTMLElement;

  // Slider should have disabled attribute.
  await waitFor(() => expect(canvas.getByRole('slider')).toBeDisabled());

  // Focus the test button.
  await user.click(testButton);
  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Click on the canvas and move pointer - position and focused element should not be slider.
  await user.click(sliderRoot);
  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Click on the handle and move pointer - position and focused element should not be slider.
  await user.click(canvas.getByRole('slider'));
  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Click on the handle and press arrow key - position and focused element should not be slider.
  await user.click(canvas.getByRole('slider'));
  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  // Move handle right.
  await user.click(canvas.getByRole('slider'));
  await user.keyboard('{ArrowRight}');
  await waitFor(() =>
    expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button'),
  );
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};
