import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import './index.css';

function Page(): JSX.Element {
  return (
    <div style={{ width: '100%', height: '100%', flexGrow: 1 }}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', height: '50%' }}
      />
      <ReactCompareSlider
        portrait
        itemOne={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://github.com/nerdyman/stuff/raw/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
            alt="Image two"
          />
        }
        style={{ width: '100%', height: '50%' }}
      />
    </div>
  );
}

export { Page };
