import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';

import { Template, getArgs } from './utils';

export default {
  title: 'Tests/E2E/Disabled',
} as Meta;

export const Disabled = (args) => (
  <div dir="rtl">
    <button type="button" data-testid="test-button">
      Button
    </button>
    <Template {...args} />
  </div>
);

Disabled.args = getArgs({ style: { width: 200, height: 200 }, disabled: true });

Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const rootComponent = canvas.queryByTestId(Disabled.args['data-testid']) as Element;

  // Should have elements on mount.
  await new Promise((resolve) => setTimeout(resolve, 500));
  await waitFor(() => expect(rootComponent).toBeInTheDocument());

  const testButton = canvas.queryByTestId('test-button') as HTMLElement;

  // Slider should have disabled attribute.
  expect(canvas.getByRole('slider')).toBeDisabled();

  // Focus the test button.
  userEvent.click(testButton);
  expect((document.activeElement as HTMLElement).getAttribute('data-testid')).toBe('test-button');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Click on the canvas and move pointer - position and focused element should not be slider.
  userEvent.click(rootComponent, { clientX: 200, clientY: 200 });
  expect((document.activeElement as HTMLElement).tagName).toBe('BODY');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Click on the handle and move pointer - position and focused element should not be slider.
  userEvent.click(canvas.getByRole('slider'), { clientX: 20, clientY: 20 });
  expect((document.activeElement as HTMLElement).tagName).toBe('BODY');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Click on the handle and press arrow key - position and focused element should not be slider.
  userEvent.click(canvas.getByRole('slider'), { clientX: 125, clientY: 125 });
  expect((document.activeElement as HTMLElement).tagName).toBe('BODY');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');

  // Move handle right.
  userEvent.keyboard('{ArrowRight}');
  expect((document.activeElement as HTMLElement).tagName).toBe('BODY');
  expect(canvas.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
};
