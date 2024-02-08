import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Default',
};
export default meta;

/** Test default props. */
export const Default = Template.bind({});
Default.args = getArgs();

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = (await canvas.findByRole('slider')) as HTMLDivElement;

  // Should have elements on mount.
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());

  // Should have a11y attributes on mount.
  await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuemin', '0'));
  await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuemax', '100'));
  await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuenow', '50'));
  await waitFor(() =>
    expect(canvas.queryByLabelText('Drag to move or focus and use arrow keys')).toBeInTheDocument(),
  );

  // Should have initial position on mount.
  await waitFor(() => expect(Default.args?.onPositionChange).toHaveBeenLastCalledWith(50));
};
