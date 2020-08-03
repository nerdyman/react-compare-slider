import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ReactCompareSlider, ReactCompareSliderHandle } from '../src';

afterEach(cleanup);

describe('ReactCompareSlider', () => {
  it('Should render with required props.', () => {
    const { container } = render(
      <ReactCompareSlider
        itemOne={<div test-id="rcs-one">Foo</div>}
        itemTwo={<div test-id="rcs-two">Bar</div>}
      />
    );

    expect(container.querySelector('[test-id="rcs-one"]')).toBeInTheDocument();
    expect(container.querySelector('[test-id="rcs-two"]')).toBeInTheDocument();
  });

  it('Should render in portrait.', () => {
    const { container } = render(
      <ReactCompareSlider
        itemOne={<div test-id="rcs-one">Foo</div>}
        itemTwo={<div test-id="rcs-two">Bar</div>}
        portrait
      />
    );

    expect(container.querySelector('[test-id="rcs-one"]')).toBeInTheDocument();
    expect(container.querySelector('[test-id="rcs-two"]')).toBeInTheDocument();
  });

  it('Should render custom handle.', () => {
    const testId = 'youcanthandlethis';
    const Handle = () => <ReactCompareSliderHandle test-id={testId} />;

    const { container } = render(
      <ReactCompareSlider
        boundsPadding={100}
        position={75}
        itemOne={<div test-id="rcs-one">Foo</div>}
        itemTwo={<div test-id="rcs-two">Bar</div>}
        handle={<Handle />}
      />
    );

    expect(container.querySelector(`[test-id=${testId}]`)).toBeInTheDocument();
  });
});
