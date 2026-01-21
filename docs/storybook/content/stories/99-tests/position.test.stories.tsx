import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Position',
};
export default meta;

export const StartAt0 = TestTemplate.bind({});
StartAt0.args = getArgs({ defaultPosition: 0 });

StartAt0.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('0'));
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-raw-position')).toBe('0%'),
  );
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0px, 0% - 0px + 0px, calc(100% - 0px))',
    ),
  );
};

export const StartAt100 = TestTemplate.bind({});
StartAt100.args = getArgs({ defaultPosition: 100, style: { width: 256 } });

StartAt100.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-raw-position')).toBe('100%'),
  );
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0px, 100% - 0px + 0px, calc(100% - 0px))',
    ),
  );
};

export const PointSamePosition = TestTemplate.bind({});
PointSamePosition.args = getArgs({ defaultPosition: 50, style: { width: 256 } });

PointSamePosition.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-raw-position')).toBe('50%'),
  );
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0px, 50% - 0px + 0px, calc(100% - 0px))',
    ),
  );

  await fireEvent.pointerDown(slider, { clientX: 128, clientY: 128 });
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-raw-position')).toBe('50%'),
  );
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0px, 50% - 0px + 0px, calc(100% - 0px))',
    ),
  );
};

/**
 * Ensure that the slider handle position is at the end of the slider when the position is 100 and
 * images do not load immediately.
 * @see https://github.com/nerdyman/react-compare-slider/issues/37
 *
 */
export const LazyImages: StoryFn<ReactCompareSliderProps> = (props) => {
  return (
    <ReactCompareSlider
      {...props}
      itemOne={
        <ReactCompareSliderImage
          loading="lazy"
          alt="one"
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
          style={{ width: 'auto' }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          loading="lazy"
          alt="one"
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
          style={{ width: 'auto' }}
        />
      }
    />
  );
};
LazyImages.args = getArgs({ defaultPosition: 50, style: { width: 'auto', height: 'auto' } });
LazyImages.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = await canvas.findByRole('slider');

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-raw-position')).toBe('50%'),
  );
  await waitFor(() =>
    expect(window.getComputedStyle(slider).getPropertyValue('--rcs-current-position')).toBe(
      'clamp(0px, 50% - 0px + 0px, calc(100% - 0px))',
    ),
  );
};

/**
 * Switch orientation and ensure position is maintained.
 */
export const ToggleOrientation: StoryFn<ReactCompareSliderProps> = (args) => {
  const [portrait, setPortrait] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <ReactCompareSlider {...args} portrait={portrait} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          gap: '.5rem',
          padding: '.5rem',
          backgroundColor: 'rgba(0, 0, 0, .75)',
        }}
      >
        <button onClick={() => setPortrait((prev) => !prev)}>Toggle orientation</button>
      </div>
    </div>
  );
};
ToggleOrientation.args = getArgs({ defaultPosition: 25, style: { width: 200, height: 200 } });

ToggleOrientation.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await user.click(canvas.getByText('Toggle orientation'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('25'));

  await user.click(canvas.getByText('Toggle orientation'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('25'));

  await fireEvent.pointerDown(sliderRoot, { clientX: 100, clientY: 100 });
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  await user.click(canvas.getByText('Toggle orientation'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};
