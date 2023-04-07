import { expect, jest } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';
import { useReactCompareSliderRef } from 'react-compare-slider';

import { UseReactCompareSliderRef as UseReactCompareSliderRefStory } from '../00-demos/00-index.stories';
import { ROOT_TEST_ID, getArgs } from './utils';

export default {
  title: 'Tests/E2E/UseReactCompareSliderRef',
} as Meta;

export const UseReactCompareSliderRef = UseReactCompareSliderRefStory;

UseReactCompareSliderRef.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider1 = canvas.queryByTestId(`${ROOT_TEST_ID}-1`) as Element;
  const slider2 = canvas.queryByTestId(`${ROOT_TEST_ID}-2`) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await waitFor(() => expect(slider1).toBeInTheDocument());
  await waitFor(() => expect(slider2).toBeInTheDocument());

  userEvent.click(slider1, {
    clientX: slider1.clientWidth * 0.75,
    clientY: slider1.clientHeight * 0.75,
  });

  await waitFor(() => {
    expect(slider1.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('75');
    expect(slider2.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('75');
  });

  userEvent.click(slider2, {
    clientX: slider2.getBoundingClientRect().left,
    clientY: slider2.getBoundingClientRect().top,
  });

  await waitFor(() => {
    expect(slider1.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('100');
    expect(slider2.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')).toBe('100');
  });
};

export const UseReactCompareSliderRefUninstantied = () => {
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