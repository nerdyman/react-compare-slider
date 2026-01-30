import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestComponent, type TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/RightToLeft',
};
export default meta;

/** Test RTL rendering. */
export const RightToLeft: typeof TestTemplate = (args) => (
  <div dir="rtl">
    <TestComponent {...args} />
  </div>
);

RightToLeft.args = getArgs({ style: { width: 200, height: 200 }, defaultPosition: 25 });

RightToLeft.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.queryByTestId(SLIDER_ROOT_TEST_ID);
  const slider = await canvas.findByRole('slider');

  // Should have elements on mount.
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Should position slider at 25%.
  await waitFor(() => expect(slider).toHaveStyle({ translate: 'clamp(0px, 25% + 0px, 100% + 0px)' }));
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('25'));
};
