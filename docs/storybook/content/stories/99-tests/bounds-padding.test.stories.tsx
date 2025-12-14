import type { Meta } from '@storybook/react-vite';
import { ReactCompareSlider } from 'react-compare-slider';
import { expect, fireEvent, waitFor, within } from 'storybook/test';

import { BoundsPadding as BoundsPaddingStory } from '../00-demos/00-index.stories';
import { getArgs, SLIDER_ROOT_TEST_ID } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/BoundsPadding',
};
export default meta;

export const BoundsPadding = BoundsPaddingStory;
BoundsPadding.args = getArgs({ ...BoundsPaddingStory.args, style: { width: '400px', height: '200px' } });

BoundsPadding.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider');
  const sliderRoot = canvas.getByTestId(SLIDER_ROOT_TEST_ID);

  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));

  await step('Move slider to 0%', async () => {
    await fireEvent.pointerDown(sliderRoot, {
      clientX: 0,
      clientY: 0,
    });
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('0'));
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        'clamp(5%, 0% - 5% + 5%, calc(100% - 5%))',
      ),
    );
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await step('Move slider to 100%', async () => {
    await fireEvent.pointerDown(sliderRoot, {
      clientX: sliderRoot.clientWidth,
      clientY: sliderRoot.clientHeight,
    });
    await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        'clamp(5%, 100% - 5% + 5%, calc(100% - 5%))',
      ),
    );
  });
};
