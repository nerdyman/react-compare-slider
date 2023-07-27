const assert = await import('node:assert');
const { describe, it } = await import('node:test');
const React = await import('react');

const { ReactCompareSlider, ReactCompareSliderImage } = await import('../../dist/index.mjs');

describe('SSR', () => {
  it('should render without error', () => {
    const root = React.createElement(ReactCompareSlider, {
      itemOne: React.createElement(ReactCompareSliderImage, {
        alt: 'Example 1',
        src: 'example-1.jpg',
      }),
      itemTwo: React.createElement(ReactCompareSliderImage, {
        alt: 'Example 2',
        src: 'example-2.jpg',
      }),
    });

    assert.strictEqual(React.isValidElement(root), true);
  });
});
