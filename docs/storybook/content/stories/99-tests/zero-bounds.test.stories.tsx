import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/ZeroBounds',
};
export default meta;

/** Rendering items with no width or height. */
export const ZeroBounds = Template.bind({});
ZeroBounds.args = getArgs({
  style: { width: 'auto', height: 'auto' },
  itemOne: <div data-testid="one" />,
  itemTwo: <div data-testid="two" />,
});

ZeroBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(ZeroBounds.args?.['data-testid']) as Element;

  // Should have elements on mount and not crash.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('two')).toBeInTheDocument());
};
