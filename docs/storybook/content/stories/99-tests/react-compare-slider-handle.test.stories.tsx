import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import React from 'react';
import { ReactCompareSliderHandle as BaseReactCompareSliderHandle } from 'react-compare-slider';

import { Template, getArgs } from './utils';

export default {
  title: 'Tests/Browser/ReactCompareSliderHandle',
} as Meta;

/** Test `handle`. */
export const ReactCompareSliderHandle = Template.bind({});

ReactCompareSliderHandle.args = getArgs({
  handle: <BaseReactCompareSliderHandle data-testid="handlearoo" style={{ color: 'red' }} />,
});

ReactCompareSliderHandle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const handle = canvas.queryByTestId('handlearoo');

  waitFor(() => expect(handle).toBeInTheDocument());

  // Lines should inherit color.
  waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-line') as HTMLElement)
        .backgroundColor,
    ).toBe('rgb(255, 0, 0)'),
  );

  // Button should inherit color.
  waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-button') as HTMLElement).color,
    ).toBe('rgb(255, 0, 0)'),
  );

  // Arrows should inherit color.
  waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-arrow') as HTMLElement).color,
    ).toBe('rgb(255, 0, 0)'),
  );
};
