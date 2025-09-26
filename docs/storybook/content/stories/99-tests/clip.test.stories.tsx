import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider } from 'react-compare-slider';

import { getArgs, Template } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Clip',
};
export default meta;

export const ClipBoth = Template.bind({});
ClipBoth.args = getArgs({
  clip: 'both',
  style: { width: 256, height: 256 },
});

ClipBoth.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;
  const sliderRoot = (await canvas.findByTestId(ClipBoth.args?.['data-testid'])) as Element;

  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));
  await waitFor(() => {
    const [itemOne, itemTwo] = Array.from(
      sliderRoot.querySelectorAll('[data-rcs="clip-item"]'),
    ) as HTMLElement[];
    expect(itemOne?.style.clipPath).toBe('inset(0px 50% 0px 0px)');
    expect(itemTwo?.style.clipPath).toBe('inset(0px 0px 0px 50%)');
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    const [itemOne, itemTwo] = Array.from(
      sliderRoot.querySelectorAll('[data-rcs="clip-item"]'),
    ) as HTMLElement[];

    expect(itemOne).toBeVisible();
    expect(itemTwo).toBeVisible();
    expect(itemOne?.style.clipPath).toBe('inset(0px 25% 0px 0px)');
    expect(itemTwo?.style.clipPath).toBe('inset(0px 0px 0px 75%)');
  });
};

export const ClipItemOne = Template.bind({});
ClipItemOne.args = getArgs({
  clip: 'itemOne',
  style: { width: 256, height: 256 },
});

ClipItemOne.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;
  const sliderRoot = (await canvas.findByTestId(ClipBoth.args?.['data-testid'])) as Element;

  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));
  await waitFor(() => {
    const [itemOne, itemTwo] = Array.from(
      sliderRoot.querySelectorAll('[data-rcs="clip-item"]'),
    ) as HTMLElement[];

    expect(itemOne).toBeVisible();
    expect(itemTwo).toBeVisible();
    expect(itemOne?.style.clipPath).toBe('inset(0px 50% 0px 0px)');
    expect(itemTwo?.style.clipPath).toBe('none');
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.75,
    clientY: sliderRoot.clientHeight * 0.75,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    const [itemOne, itemTwo] = Array.from(
      sliderRoot.querySelectorAll('[data-rcs="clip-item"]'),
    ) as HTMLElement[];

    expect(itemOne).toBeVisible();
    expect(itemTwo).toBeVisible();
    expect(itemOne?.style.clipPath).toBe('inset(0px 25% 0px 0px)');
    expect(itemTwo?.style.clipPath).toBe('none');
  });
};

export const ClipItemTwo = Template.bind({});
ClipItemTwo.args = getArgs({
  clip: 'itemTwo',
  style: { width: 256, height: 256 },
});

ClipItemTwo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;
  const sliderRoot = (await canvas.findByTestId(ClipBoth.args?.['data-testid'])) as Element;

  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(async () => expect(await canvas.findAllByRole('img')).toHaveLength(2));
  await waitFor(() => {
    const [itemOne, itemTwo] = Array.from(
      sliderRoot.querySelectorAll('[data-rcs="clip-item"]'),
    ) as HTMLElement[];
    expect(itemOne?.style.clipPath).toBe('none');
    expect(itemTwo?.style.clipPath).toBe('inset(0px 0px 0px 50%)');
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await fireEvent.pointerDown(sliderRoot, {
    clientX: sliderRoot.clientWidth * 0.25,
    clientY: sliderRoot.clientHeight * 0.25,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  await waitFor(() => {
    const [itemOne, itemTwo] = Array.from(
      sliderRoot.querySelectorAll('[data-rcs="clip-item"]'),
    ) as HTMLElement[];
    expect(itemOne?.style.clipPath).toBe('none');
    expect(itemTwo?.style.clipPath).toBe('inset(0px 0px 0px 25%)');
  });
};
