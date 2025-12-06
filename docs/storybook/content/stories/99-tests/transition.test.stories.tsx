import type { Meta } from '@storybook/react-vite';
import type { ReactCompareSlider } from 'react-compare-slider';
import { expect, fireEvent, waitFor, within } from 'storybook/test';

import { getArgs, SLIDER_ROOT_TEST_ID, TestTemplate } from './test-utils';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Transition',
};
export default meta;

export const Transition = TestTemplate.bind({});
Transition.args = getArgs({
  position: 0,
  transition: '0.2s ease',
  style: { width: 200, height: 200 },
});

Transition.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = await canvas.findByTestId(SLIDER_ROOT_TEST_ID);

  await new Promise((resolve) =>
    setTimeout(() => {
      fireEvent.pointerDown(sliderRoot, { clientX: 199, clientY: 25 });
      resolve(true);
    }, 200),
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 100 });
      resolve(true);
    }, 200),
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      fireEvent.pointerDown(sliderRoot, { clientX: 100, clientY: 100 });
      resolve(true);
    }, 200),
  );

  // Should have initial position on mount.
  await waitFor(() => expect(Transition.args?.onPositionChange).toHaveBeenLastCalledWith(50));
};
