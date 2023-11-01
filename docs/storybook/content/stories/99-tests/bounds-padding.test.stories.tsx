import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/BoundsPadding',
};
export default meta;

/** Test default props. */
export const Default = Template.bind({});
Default.args = getArgs({ boundsPadding: 40, style: { width: 200, height: 200 } });

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(Default.args?.['data-testid']) as Element;
  const slider = canvas.queryByRole('slider') as HTMLDivElement;

  // Should have elements on mount.
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());

  const bounds = sliderRoot.getBoundingClientRect();

  await waitFor(() =>
    fireEvent.pointerDown(sliderRoot, {
      clientX: bounds.width,
      clientY: bounds.height / 2,
    }),
  );

  await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '100'));
  // Bounds padding is `20%` of the overall width.
  await waitFor(() => expect(slider.style.left).toBe('80%'));
};

/** Test default props. */
export const Portrait = Template.bind({});
Portrait.args = getArgs({ boundsPadding: 40, portrait: true, style: { width: 200, height: 200 } });

Portrait.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(Portrait.args?.['data-testid']) as Element;
  const slider = canvas.queryByRole('slider') as HTMLDivElement;

  // Should have elements on mount.
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());

  const bounds = sliderRoot.getBoundingClientRect();

  await waitFor(() =>
    fireEvent.pointerDown(sliderRoot, {
      clientX: bounds.width / 2,
      clientY: bounds.height,
    }),
  );

  await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '100'));
  // Bounds padding is `20%` of the overall width.
  await waitFor(() => expect(slider.style.top).toBe('80%'));
};
