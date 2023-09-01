// @ts-check
/* eslint no-console: 0 */

const assert = await import('node:assert');
const { describe, it } = await import('node:test');

// Using `jest-mock` instead of built-in Node.js `mock` to allow this to run on node 16.
const mock = await import('jest-mock');
const { createElement, isValidElement } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');

const { ReactCompareSlider, ReactCompareSliderHandle, ReactCompareSliderImage, styleFitContainer } =
  await import('react-compare-slider');

describe('SSR', () => {
  it('should render without error', () => {
    const mockConsoleError = mock.spyOn(console, 'error');
    const mockConsoleWarn = mock.spyOn(console, 'warn');

    const root = createElement(ReactCompareSlider, {
      handle: createElement(ReactCompareSliderHandle, {}),
      itemOne: createElement(ReactCompareSliderImage, {
        alt: 'Example 1',
        src: 'example-1.jpg',
        style: styleFitContainer({ objectPosition: 'left' }),
      }),
      itemTwo: createElement(ReactCompareSliderImage, {
        alt: 'Example 2',
        src: 'example-2.jpg',
        style: styleFitContainer({ objectPosition: 'left' }),
      }),
    });

    assert.strictEqual(isValidElement(root), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('data-rcs="root"'), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('src="example-1.jpg"'), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('src="example-2.jpg"'), true);
    assert.strictEqual(mockConsoleError.mock.calls.length, 0);
    assert.strictEqual(mockConsoleWarn.mock.calls.length, 0);

    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();
  });
});
