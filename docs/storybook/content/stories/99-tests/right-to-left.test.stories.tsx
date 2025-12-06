import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

import { getArgs, Template } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/RightToLeft',
};
export default meta;

/** Test RTL rendering. */
export const RightToLeft: typeof Template = (args) => (
  <div dir="rtl">
    <Template {...args} />
  </div>
);

RightToLeft.args = getArgs({ style: { width: 200, height: 200 }, position: 25 });

RightToLeft.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(RightToLeft.args?.['data-testid']) as HTMLElement;
  const slider = canvas.getByRole('slider') as HTMLElement;

  // Should have elements on mount.
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  // Should position slider at 25%.
  await waitFor(() => expect(slider).toHaveStyle({ left: '50px' }));
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('25'));
};
