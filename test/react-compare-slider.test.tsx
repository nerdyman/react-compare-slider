import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactCompareSlider, ReactCompareSliderProps } from '../src';

describe('it', (): void => {
  it('renders required props without crashing', (): void => {
    const defaultProps: ReactCompareSliderProps = {
      itemOne: <div>Foo</div>,
      itemTwo: <div>Bar</div>,
    };

    const div = document.createElement('div');
    ReactDOM.render(<ReactCompareSlider {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
