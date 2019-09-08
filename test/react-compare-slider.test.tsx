import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ReactCompareSlider,
  // ReactCompareSliderProps,
  styleFitContainer,
} from '../src';

describe('ReactCompareSlider', (): void => {
  it('should render required props without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ReactCompareSlider itemOne={<div>Foo</div>} itemTwo={<div>Bar</div>} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  // should render with legacy 'clip'
  // should render with custom handle
  // should render with custom position
});

describe('styleFitContainer', (): void => {
  it('should return object', (): void => {
    expect(typeof styleFitContainer()).toBe('object');
  });

  it("should return 'contain' style", (): void => {
    expect(styleFitContainer({ objectFit: 'contain' }).objectFit).toBe(
      'contain'
    );
  });

  it('should return with custom props', (): void => {
    expect(styleFitContainer({ color: 'green' }).color).toBe('green');
  });
});
