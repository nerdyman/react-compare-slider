import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReactCompareSlider, ReactCompareSliderImage } from '../../src';

storiesOf('Demos|Images', module)
  .add(
    'Basic',
    () => (
      <ReactCompareSlider
        onChange={position => console.log(`Landscape position: ${position}`)}
        itemOne={<ReactCompareSliderImage src="" alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src="" alt="Image one" />}
      />
    ),
    { options: { showPanel: true } }
  )
  .add(
    'Basic Portrait',
    () => (
      <ReactCompareSlider
        portrait
        onChange={position => console.log(`Portrait position: ${position}`)}
        itemOne={<ReactCompareSliderImage src="" alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src="" alt="Image one" />}
      />
    ),
    { options: { showPanel: true } }
  );
