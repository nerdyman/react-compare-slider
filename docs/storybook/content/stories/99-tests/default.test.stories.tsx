import type { Meta } from '@storybook/react-vite';
import { ReactCompareSlider } from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Default',
};

export default meta;

/** Test default props. */
export const Default = TestTemplate.bind({});
Default.args = getArgs();

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');
  const sliderRoot = canvas.getByTestId(SLIDER_ROOT_TEST_ID);

  await step('Should have elements on mount', async () => {
    await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
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

  await step('Should have initial position on mount', async () => {
    await waitFor(() => expect(Default.args?.onPositionChange).toHaveBeenLastCalledWith(50));
  });
};

export const PrefersReducedMotion = TestTemplate.bind({});
PrefersReducedMotion.args = getArgs();
PrefersReducedMotion.parameters = { test: { emulateMedia: { reducedMotion: 'reduce' } } };

PrefersReducedMotion.play = async ({ mount, args, step }) => {
  const canvas = await mount(<ReactCompareSlider {...args} />);
  const sliderRoot = canvas.getByTestId(SLIDER_ROOT_TEST_ID);

  await step('Should not have transition set', async () => {
    await waitFor(() =>
      expect(window.getComputedStyle(sliderRoot).transition).not.toBe('--rcs-raw-position 0.15s ease-out'),
    );
  });
};
