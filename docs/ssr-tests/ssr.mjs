const { createElement } = await import('react');

const { ReactCompareSlider, ReactCompareSliderImage } = await import('react-compare-slider');

export const render = () => {
  const root = createElement(ReactCompareSlider, {
    itemOne: createElement(ReactCompareSliderImage, {
      alt: 'Example 1',
      src: 'example-1.jpg',
    }),
    itemTwo: createElement(ReactCompareSliderImage, {
      alt: 'Example 2',
      src: 'example-2.jpg',
    }),
  });

  return root;
};
