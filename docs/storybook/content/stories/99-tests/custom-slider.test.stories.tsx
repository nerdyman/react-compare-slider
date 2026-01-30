import type { Meta, StoryFn } from '@storybook/react-vite';
import { type ReactCompareSlider, useReactCompareSliderContext } from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

import { getArgs } from './test-utils';
import { CustomSlider as CustomSliderStory } from '../00-demos/00-index.stories';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Custom Components',
};

export default meta;

export const CustomSlider = CustomSliderStory.bind({});
CustomSlider.args = getArgs({ style: { width: 256, height: 256 } });

CustomSlider.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');

  await step('should set position to 75%', async () => {
    await canvas.getByText('Set position to 75%').click();
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '75'));
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        'clamp(0px, 75% - 0px + 0px, calc(100% - 0px))',
      ),
    );
  });

  await step('should set position by bounds (100px)', async () => {
    await canvas.getByText('Set X position by bounds (100px)').click();
    const percentageFromPixels = (100 / 256) * 100;
    await waitFor(() =>
      expect(slider).toHaveAttribute(
        'aria-valuenow',
        Number.parseInt(percentageFromPixels.toString()).toString(),
      ),
    );
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        `clamp(0px, ${percentageFromPixels}% - 0px + 0px, calc(100% - 0px))`,
      ),
    );
  });

  await step('should reset position', async () => {
    await canvas.getByText('Reset position').click();
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuenow', '50'));
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        'clamp(0px, 50% - 0px + 0px, calc(100% - 0px))',
      ),
    );
  });
};
