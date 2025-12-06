import type { Meta } from '@storybook/react-vite';
import { type ReactCompareSlider, ReactCompareSliderClipOption } from 'react-compare-slider';
import { expect, fireEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Clip',
};
export default meta;

export const ClipBoth = TestTemplate.bind({});
ClipBoth.args = getArgs({
  clip: 'both',
  style: { width: 256, height: 256 },
});

ClipBoth.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));
  await waitFor(() => {
    expect(window.getComputedStyle(sliderRoot).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0%, 50% - 0% + 0%, calc(100% - 0%))',
    );
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await waitFor(() => {
    expect(window.getComputedStyle(sliderRoot).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0%, 75% - 0% + 0%, calc(100% - 0%))',
    );
  });

  await waitFor(() => {
    const [itemOne, itemTwo] = sliderRoot.querySelectorAll('[data-rcs="clip-item"]');

    expect(sliderRoot.getAttribute('data-rcs-clip')).toBe(ReactCompareSliderClipOption.both);
    expect(window.getComputedStyle(itemOne).clipPath).toBe('inset(0px 25% 0px 0px)');
    expect(window.getComputedStyle(itemTwo).clipPath).toBe('inset(0px 0px 0px 75%)');
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

  await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));

  await waitFor(() => {
    const [itemOne, itemTwo] = sliderRoot.querySelectorAll('[data-rcs="clip-item"]');

    expect(sliderRoot.getAttribute('data-rcs-clip')).toBe(ReactCompareSliderClipOption.itemOne);
    expect(window.getComputedStyle(itemOne).clipPath).toBe('inset(0px 50% 0px 0px)');
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

    expect(sliderRoot.getAttribute('data-rcs-clip')).toBe(ReactCompareSliderClipOption.itemTwo);
    expect(window.getComputedStyle(itemOne).clipPath).toBe('none');
    expect(window.getComputedStyle(itemTwo).clipPath).toBe('inset(0px 0px 0px 50%)');
  });
};
