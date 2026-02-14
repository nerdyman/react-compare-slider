import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSlider, ReactCompareSliderProps } from 'react-compare-slider';
import { expect, fn, waitFor } from 'storybook/test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/SSR',
};
export default meta;

export const SSR: StoryFn<ReactCompareSliderProps> = () => <></>;
SSR.args = { itemOne: <div>One</div>, itemTwo: <div>Two</div>, onPositionChange: fn(console.log) };

// Same as Default but with but runs on server via `mount`.
SSR.play = async ({ mount, args, step }) => {
  const { ReactCompareSlider } = await import('react-compare-slider');

  const canvas = await mount(<ReactCompareSlider data-testid="ssr-test" {...args} />);
  const slider = await canvas.findByRole('slider');
  const sliderRoot = canvas.getByTestId('ssr-test');

  await step('Should have elements on mount', async () => {
    await waitFor(() => expect(canvas.getByText('One')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByText('Two')).toBeInTheDocument());
  });

  await step('Should have a11y attributes on mount', async () => {
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuemin', '0'));
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuemax', '100'));
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '50'));
    await waitFor(() =>
      expect(
        canvas.queryByLabelText(
          'Click and drag or focus and use arrow keys to change the position of the slider',
        ),
      ).toBeInTheDocument(),
    );
  });

  await step('Should have a transition on mount', async () => {
    await waitFor(() =>
      expect(window.getComputedStyle(sliderRoot).transition).toBe('--rcs-raw-position 0.15s ease-out'),
    );
  });

  // Should have initial position on mount.
  await step('Should have initial position on mount', async () => {
    await waitFor(() => expect(SSR.args?.onPositionChange).toHaveBeenLastCalledWith(50));
  });
};
