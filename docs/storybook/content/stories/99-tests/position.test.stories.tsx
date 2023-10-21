import { expect } from '@storybook/jest';
import type { Meta, StoryFn } from '@storybook/react';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import { useState } from 'react';
import type { ReactCompareSliderProps } from 'react-compare-slider';
import { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Position',
};
export default meta;

export const StartAt0 = Template.bind({});
StartAt0.args = getArgs({ position: 0 });

StartAt0.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(StartAt100.args?.['data-testid']) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('0'));
};

export const StartAt100 = Template.bind({});
StartAt100.args = getArgs({ position: 100 });

StartAt100.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(StartAt100.args?.['data-testid']) as Element;

  await waitFor(() => expect(sliderRoot).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('100'));
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
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('25');

  await user.click(canvas.getByText('Toggle orientation'));
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('25');

  fireEvent.pointerDown(sliderRoot, { clientX: 100, clientY: 100 });
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  await user.click(canvas.getByText('Toggle orientation'));
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
};
