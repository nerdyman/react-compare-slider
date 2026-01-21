import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import {
  ReactCompareSliderHandle as BaseReactCompareSliderHandle,
  ReactCompareSliderCssVars,
} from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

import { getArgs, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/ReactCompareSliderHandle',
};
export default meta;

/** Test `handle`. */
export const ReactCompareSliderHandle = TestTemplate.bind({});

ReactCompareSliderHandle.args = getArgs({
  handle: (
    <BaseReactCompareSliderHandle
      data-testid="handlearoo"
      style={{ [ReactCompareSliderCssVars.handleColor]: 'red' } as React.CSSProperties}
    />
  ),
});

ReactCompareSliderHandle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const handle = await canvas.findByTestId('handlearoo');

  // Lines should inherit color.
  await waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-line') as HTMLElement).outlineColor,
    ).toBe('rgb(255, 0, 0)'),
  );

  // Button should inherit color.
  await waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-button') as HTMLElement).borderColor,
    ).toBe('rgb(255, 0, 0)'),
  );

  // Arrows should inherit color.
  await waitFor(() =>
    expect(
      window.getComputedStyle(handle?.querySelector('.__rcs-handle-arrow') as HTMLElement).outlineColor,
    ).toBe('rgb(255, 0, 0)'),
  );
};
