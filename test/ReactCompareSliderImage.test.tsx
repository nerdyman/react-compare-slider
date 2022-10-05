import { cleanup, render } from '@testing-library/react';
import React from 'react';

import { ReactCompareSliderImage } from '../src';

afterEach(cleanup);

describe('ReactCompareSlider', () => {
  it('Should render image.', () => {
    const props = {
      alt: 'Testaroo',
      src: 'https://via.placeholder.com/1280x720',
      srcSet:
        'https:/via.placeholder.com/320x480?text=Small 320w, https://via.placeholder.com/800x600?text=Medium 768w',
    };

    const { getByAltText } = render(<ReactCompareSliderImage {...props} />);

    expect(getByAltText(props.alt)?.getAttribute('src')).toBe(props.src);
    expect(getByAltText(props.alt)?.getAttribute('srcset')).toBe(props.srcSet);
  });
});
