const assert = await import('node:assert');
const { describe, it } = await import('node:test');

const React = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');

const { ReactCompareSlider, ReactCompareSliderImage } = await import('react-compare-slider');

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
    assert.strictEqual(renderToStaticMarkup(root).includes('data-rcs="root"'), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('example-1.jpg'), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('example-2.jpg'), true);
  });
});
