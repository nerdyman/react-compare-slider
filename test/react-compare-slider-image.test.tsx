import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ReactCompareSliderImage } from '../src';

afterEach(cleanup);

describe('ReactCompareSlider', () => {
  it('Should render image.', () => {
    const alt = 'Testaroo';
    const src = 'https://via.placeholder.com/1280x720';
    const srcSet =
      'https://via.placeholder.com/320x480?text=Small 320w, https://via.placeholder.com/320x480?text=Medium 768w';

    const { getByAltText } = render(
      <ReactCompareSliderImage alt={alt} src={src} srcSet={srcSet} />
    );

    expect(getByAltText(alt)?.getAttribute('src')).toBe(src);
    expect(getByAltText(alt)?.getAttribute('srcset')).toBe(srcSet);
  });

  it('Should render background image for unsupported browsers.', () => {
    const src = 'https://via.placeholder.com/1280x720';
    const { container } = render(<ReactCompareSliderImage src={src} />);

    expect(container.firstChild).toHaveStyle(`background-image: url(${src});`);
  });

  it('Should not render background image for unsupported browsers when fallback is disabled.', () => {
    const src = 'https://via.placeholder.com/1280x720';
    const { container } = render(
      <ReactCompareSliderImage fallbackEnable={false} src={src} />
    );

    expect(container.firstChild).not.toHaveStyle(
      `background-image: url(${src});`
    );
  });
});
