import { expect, jest } from '@storybook/jest';
import type { Meta, StoryFn } from '@storybook/react';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
import { useReactCompareSliderRef } from 'react-compare-slider';

import { UseReactCompareSliderRef as UseReactCompareSliderRefStory } from '../00-demos/00-index.stories';
import { SLIDER_ROOT_TEST_ID, getArgs } from './test-utils.test';

export default {
  title: 'Tests/Browser/UseReactCompareSliderRef',
} as Meta;

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
  console.warn = jest.fn();
  const ref = useReactCompareSliderRef();

  ref.current.setPosition(50);

  return <div>Nope</div>;
};

UseReactCompareSliderRefUninstantied.args = getArgs();

UseReactCompareSliderRefUninstantied.play = async () => {
  expect(console.warn).toHaveBeenCalledWith(
    '[react-compare-slider] `setPosition` cannot be used until the component has mounted.',
  );
};
