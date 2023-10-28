import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { useState } from 'react';
import type { ReactCompareSliderDetailedProps } from 'react-compare-slider';
import { ReactCompareSlider } from 'react-compare-slider';

import { Template, getArgs } from './test-utils.test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/ZeroBounds',
};
export default meta;

/** Rendering items with no width or height. */
export const ZeroBounds = Template.bind({});
ZeroBounds.args = getArgs({
  style: { width: 'auto', height: 'auto' },
  itemOne: <div data-testid="one" />,
  itemTwo: <div data-testid="two" />,
});

ZeroBounds.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider') as Element;

  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('two')).toBeInTheDocument());
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('50'));
};

/**
 * Rendering items with no width or height the change them to images after rendering.
 */
export const ZeroBoundsWithLazyContent = () => {
  const [dir, setDir] = useState('ltr');
  const [props, setProps] = useState<ReactCompareSliderDetailedProps>({
    position: 0,
    portrait: true,
    itemOne: <div data-testid="one" />,
    itemTwo: <div data-testid="two" />,
  });

  const loadContent = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProps((prev) => ({
      ...prev,
      position: 100,
      itemOne: (
        <img
          data-testid="one"
          alt="one"
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png"
          style={{ width: 128, height: 128, objectFit: 'cover' }}
        />
      ),
      itemTwo: (
        <img
          data-testid="two"
          alt="two"
          src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-2.png"
          style={{ width: 128, height: 128, objectFit: 'cover' }}
        />
      ),
    }));
  };

  return (
    <div dir={dir} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={loadContent}>Load content</button>
        <button onClick={() => setProps((prev) => ({ ...prev, portrait: !prev.portrait }))}>
          Toggle portrait
        </button>
        <button onClick={() => setDir((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'))}>
          Toggle direction
        </button>
      </div>
      <ReactCompareSlider {...props} />
    </div>
  );
};

ZeroBoundsWithLazyContent.play = async ({ canvasElement }) => {
  const user = userEvent.setup();
  const canvas = within(canvasElement);
  const slider = (await canvas.findByRole('slider')) as Element;
  const loadImages = await canvas.findByText('Load content');
  const togglePortrait = await canvas.findByText('Toggle portrait');
  const toggleDirection = await canvas.findByText('Toggle direction');

  await waitFor(() => expect(slider).toBeInTheDocument());
  await waitFor(() => expect(loadImages).toBeInTheDocument());
  await waitFor(() => expect(togglePortrait).toBeInTheDocument());
  await waitFor(() => expect(toggleDirection).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('one')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('two')).toBeInTheDocument());
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('0'));

  await user.click(loadImages);
  await waitFor(() => expect(canvas.getByAltText('one')).toBeInTheDocument(), { timeout: 3000 });
  await waitFor(() => expect(canvas.getByAltText('two')).toBeInTheDocument());
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).width)).toBe(128));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).height)).not.toBe(128));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).top)).toBe(128));

  await user.click(togglePortrait);
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).width)).not.toBe(128));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).height)).toBe(128));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).left)).toBe(128));

  await user.click(toggleDirection);
  await waitFor(() => expect(slider.getAttribute('aria-valuenow')).toBe('100'));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).width)).not.toBe(128));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).height)).toBe(128));
  await waitFor(() => expect(parseInt(window.getComputedStyle(slider).left)).toBe(128));
};
