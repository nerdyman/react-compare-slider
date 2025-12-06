import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { useReactCompareSliderRef } from 'react-compare-slider';
import { expect, fireEvent, fn, waitFor, within } from 'storybook/test';

import { UseReactCompareSliderRef as UseReactCompareSliderRefStory } from '../00-demos/00-index.stories';
import { getArgs, SLIDER_ROOT_TEST_ID } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/UseReactCompareSliderRef',
};
export default meta;

export const UseReactCompareSliderRef = UseReactCompareSliderRefStory;

UseReactCompareSliderRef.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider1 = canvas.queryByTestId(`${SLIDER_ROOT_TEST_ID}-1`) as Element;
  const slider2 = canvas.queryByTestId(`${SLIDER_ROOT_TEST_ID}-2`) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await waitFor(() => expect(slider1).toBeInTheDocument());
  await waitFor(() => expect(slider2).toBeInTheDocument());

  fireEvent.pointerDown(slider1, {
    clientX: slider1.clientWidth * 0.75,
    clientY: slider1.clientHeight * 0.75,
  });

  await waitFor(() => {
    expect(slider1.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('75');
    expect(slider2.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('75');
  });

  fireEvent.pointerDown(slider2, {
    clientX: slider2.getBoundingClientRect().right,
    clientY: slider2.getBoundingClientRect().top,
  });

  await waitFor(() => {
    expect(slider1.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('100');
    expect(slider2.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('100');
  });
};

export const UseReactCompareSliderRefUninstantied: StoryFn = () => {
  console.warn = fn();
  const ref = useReactCompareSliderRef();

  ref.current.setPosition(50);

  return <div>Nope</div>;
};

UseReactCompareSliderRefUninstantied.args = getArgs();

UseReactCompareSliderRefUninstantied.play = async () => {
  await waitFor(() =>
    expect(console.warn).toHaveBeenCalledWith(
      '[react-compare-slider] `setPosition` cannot be used until the component has mounted.',
    ),
  );
};
