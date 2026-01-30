import type { Meta } from '@storybook/react-vite';
import { type ReactCompareSlider, ReactCompareSliderClip } from 'react-compare-slider';
import { expect, fireEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Clip',
};
export default meta;

export const ClipBoth = TestTemplate.bind({});
ClipBoth.args = getArgs({
  clip: 'all',
  style: { width: 256, height: 256 },
});

ClipBoth.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);
  const slider = await canvas.findByRole('slider');

  await step('should have initial clip styles', async () => {
    await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-raw-position')).toBe('50%'),
    );
    await waitFor(() =>
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        'clamp(0px, 50% - 0px + 0px, calc(100% - 0px))',
      ),
    );
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await step('set position to 75%', async () => {
    await fireEvent.pointerDown(sliderRoot, {
      clientX: sliderRoot.clientWidth * 0.75,
      clientY: sliderRoot.clientHeight * 0.75,
    });

    await fireEvent.pointerUp(sliderRoot);
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await step('should have updated clip styles on both items', async () => {
    await waitFor(() => {
      expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
        'clamp(0px, 75% - 0px + 0px, calc(100% - 0px))',
      );
    });

    await waitFor(() => {
      const [itemOne, itemTwo] = sliderRoot.querySelectorAll('[data-rcs="clip-item"]');

      expect(sliderRoot.getAttribute('data-rcs-clip')).toBe(ReactCompareSliderClip.all);
      expect(window.getComputedStyle(itemOne).clipPath).toBe(
        'inset(0px calc(100% - clamp(0px, 75% + 0px, 100% + 0px)) 0px 0px)',
      );
      expect(window.getComputedStyle(itemTwo).clipPath).toBe(
        'inset(0px 0px 0px clamp(0px, 75% + 0px, 100% + 0px))',
      );
    });
  });
};

export const ClipItemOne = TestTemplate.bind({});
ClipItemOne.args = getArgs({
  clip: 'itemOne',
  style: { width: 256, height: 256 },
});

ClipItemOne.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  expect(await canvas.findAllByRole('img')).toHaveLength(2);

  await waitFor(() => {
    const [itemOne, itemTwo] = sliderRoot.querySelectorAll('[data-rcs="clip-item"]');

    expect(sliderRoot.getAttribute('data-rcs-clip')).toBe(ReactCompareSliderClip.itemOne);
    expect(window.getComputedStyle(itemOne).clipPath).toBe(
      'inset(0px calc(100% - clamp(0px, 50% + 0px, 100% + 0px)) 0px 0px)',
    );
    expect(window.getComputedStyle(itemTwo).clipPath).toBe('none');
  });
};

export const ClipItemTwo = TestTemplate.bind({});
ClipItemTwo.args = getArgs({
  clip: 'itemTwo',
  style: { width: 256, height: 256 },
});

ClipItemTwo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));

  await waitFor(() => {
    const [itemOne, itemTwo] = sliderRoot.querySelectorAll('[data-rcs="clip-item"]');

    expect(sliderRoot.getAttribute('data-rcs-clip')).toBe(ReactCompareSliderClip.itemTwo);
    expect(window.getComputedStyle(itemOne).clipPath).toBe('none');
    // expect(window.getComputedStyle(itemTwo).clipPath).toBe('inset(0px 0px 0px 50%)');
    expect(window.getComputedStyle(itemTwo).clipPath).toBe(
      'inset(0px 0px 0px clamp(0px, 50% + 0px, 100% + 0px))',
    );
  });
};
