import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { fireEvent, waitFor, within } from '@storybook/testing-library';

import { Template, getArgs } from './test-utils.test';

export default {
  title: 'Tests/Browser/Transition',
} as Meta;

export const Transition = Template.bind({});
Transition.args = getArgs({
  position: 0,
  transition: '0.2s ease',
  style: { width: 200, height: 200 },
});

Transition.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const sliderRoot = canvas.queryByTestId(Transition.args?.['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(sliderRoot).toBeInTheDocument());

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
