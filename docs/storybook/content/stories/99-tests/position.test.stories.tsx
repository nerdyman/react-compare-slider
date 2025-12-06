import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { getArgs, Template } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Position',
};
export default meta;

export const StartAt0 = Template.bind({});
StartAt0.args = getArgs({ position: 0 });

StartAt0.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('0'));
  await waitFor(() => expect(window.getComputedStyle(slider).left).toBe('0px'));
};

export const StartAt100 = Template.bind({});
StartAt100.args = getArgs({ position: 100, style: { width: 256 } });

StartAt100.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() => expect(window.getComputedStyle(slider).left).toBe('256px'));
};

export const PointSamePosition = Template.bind({});
PointSamePosition.args = getArgs({ position: 50, style: { width: 256 } });

PointSamePosition.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  await waitFor(() => expect(window.getComputedStyle(slider).left).toBe('128px'));

  await fireEvent.pointerDown(slider, { clientX: 128, clientY: 128 });
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
  await waitFor(() => expect(window.getComputedStyle(slider).left).toBe('128px'));
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
LazyImages.args = getArgs({ position: 100, style: { width: 'auto', height: 'auto' } });
LazyImages.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as HTMLDivElement;

  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() => expect(slider.style.left).toBe('100%'));
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
ToggleOrientation.args = getArgs({ position: 25, style: { width: 200, height: 200 } });

ToggleOrientation.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(StartAt100.args?.['data-testid']) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

  await user.click(canvas.getByText('Toggle orientation'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('25'));

  await user.click(canvas.getByText('Toggle orientation'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('25'));

  fireEvent.pointerDown(sliderRoot, { clientX: 100, clientY: 100 });
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));

  await user.click(canvas.getByText('Toggle orientation'));
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50'));
};
