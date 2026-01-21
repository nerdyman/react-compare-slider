import type { Meta } from '@storybook/react-vite';
import { ReactCompareSlider } from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

import { getArgs, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Default',
};

export default meta;

/** Test default props. */
export const Default = TestTemplate.bind({});
Default.args = getArgs();

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByRole('slider');

  await step('Should have elements on mount', async () => {
    await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
  });

  await step('Should have a11y attributes on mount', async () => {
    await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuemin', '0'));
    await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuemax', '100'));
    await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuenow', '50'));
    await waitFor(() =>
      expect(
        canvas.queryByLabelText(
          'Click and drag or focus and use arrow keys to change the position of the slider',
        ),
      ).toBeInTheDocument(),
    );
  });

  await step('Should have initial position on mount', async () => {
    await waitFor(() => expect(Default.args?.onPositionChange).toHaveBeenLastCalledWith(50));
  });
};

export const SSR = TestTemplate.bind({});
SSR.args = getArgs();

// Same as Default but with but runs on server via `mount`.
SSR.play = async ({ mount, args, step }) => {
  const canvas = await mount(<ReactCompareSlider {...args} />);
  const sliderRoot = await canvas.findByRole('slider');

  await step('Should have elements on mount', async () => {
    await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
  });

  await step('Should have a11y attributes on mount', async () => {
    await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuemin', '0'));
    await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuemax', '100'));
    await waitFor(() => expect(sliderRoot).toHaveAttribute('aria-valuenow', '50'));
    await waitFor(() =>
      expect(
        canvas.queryByLabelText(
          'Click and drag or focus and use arrow keys to change the position of the slider',
        ),
      ).toBeInTheDocument(),
    );
  });

  // Should have initial position on mount.
  await step('Should have initial position on mount', async () => {
    await waitFor(() => expect(SSR.args?.onPositionChange).toHaveBeenLastCalledWith(50));
  });
};
