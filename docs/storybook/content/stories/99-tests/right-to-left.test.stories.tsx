import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import React from 'react';

import { Template, getArgs } from './utils';

export default {
  title: 'Tests/E2E/RightToLeft',
} as Meta;

/** Test RTL rendering. */
export const RightToLeft = (args) => (
  <div dir="rtl">
    <Template {...args} />
  </div>
);

RightToLeft.args = getArgs({ style: { width: 200, height: 200 }, position: 25 });

RightToLeft.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(RightToLeft.args['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());
};
