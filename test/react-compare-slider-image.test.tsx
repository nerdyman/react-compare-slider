import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactCompareSliderImage } from '../src';

describe('ReactCompareSlider', (): void => {
  it('should render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ReactCompareSliderImage src="https://via.placeholder.com/1280x720?text=Render" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  // it('should render background image for unsupported browsers', (): void => {});
  // it('should pass custom styles', (): void => {});
});
