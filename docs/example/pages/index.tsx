import React from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

function Page(): JSX.Element {
  return (
    <div style={{ display: 'grid' }}>
      <ReactCompareSlider />
      <ReactCompareSlider />
    </div>
  );
}

export { Page };
