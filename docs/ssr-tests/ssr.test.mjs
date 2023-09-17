// @ts-check
/* eslint no-console: 0 */

const assert = await import('node:assert');
const { describe, it } = await import('node:test');

const { createElement, isValidElement } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
// Using npm version of node built-in test lib to allow the test suite to run on node 16.
const { MockTracker } = await import('test/lib/internal/test_runner/mock.js');

const { ReactCompareSlider, ReactCompareSliderHandle, ReactCompareSliderImage, styleFitContainer } =
  await import('react-compare-slider');

describe('SSR', () => {
  it('should render without error', () => {
    const mock = new MockTracker();
    const mockConsoleError = mock.method(console, 'error');
    const mockConsoleWarn = mock.method(console, 'warn');

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

    /**
     * TypeScript errors if assertion isn't assigned.
     * @see https://github.com/microsoft/TypeScript/issues/36931
     */
    let __ = assert.strictEqual(isValidElement(root), true);
    __ = assert.strictEqual(renderToStaticMarkup(root).includes('data-rcs="root"'), true);
    __ = assert.strictEqual(renderToStaticMarkup(root).includes('src="example-1.jpg"'), true);
    __ = assert.strictEqual(renderToStaticMarkup(root).includes('src="example-2.jpg"'), true);
    __ = assert.strictEqual(mockConsoleError.mock.calls.length, 0);
    __ = assert.strictEqual(mockConsoleWarn.mock.calls.length, 0);

    mock.reset();
  });
});
