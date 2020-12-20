import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { ReactCompareSlider, ReactCompareSliderHandle } from '../src';

const getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
  /**
   * @HACK Big ol' hack to imitate `getBoundingClientRect` to allow for testing
   *       `onPositionChange` callback.
   */
  (window.HTMLElement.prototype as any).getBoundingClientRect = function () {
    return {
      width: parseFloat(this.style.width) || 0,
      height: parseFloat(this.style.height) || 0,
      top: parseFloat(this.style.marginTop) || 0,
      left: parseFloat(this.style.marginLeft) || 0,
    };
  };
});

afterAll(() => {
  (window.HTMLElement.prototype as any).getBoundingClientRect = getBoundingClientRect;
});

afterEach(cleanup);

describe('ReactCompareSlider', () => {
  it('Should render with required props.', () => {
    const { getByTestId } = render(
      <ReactCompareSlider
        itemOne={<div data-testid="rcs-one">Foo</div>}
        itemTwo={<div data-testid="rcs-two">Bar</div>}
      />
    );

    expect(getByTestId('rcs-one')).toBeInTheDocument();
    expect(getByTestId('rcs-two')).toBeInTheDocument();
  });

  it('Should render in portrait with custom style.', () => {
    const style = { width: '100%', height: '100%' };
    const { getByTestId } = render(
      <ReactCompareSlider
        style={style}
        itemOne={<div data-testid="rcs-one">Foo</div>}
        itemTwo={<div data-testid="rcs-two">Bar</div>}
        portrait
      />
    );

    expect(getByTestId('rcs-one')).toBeInTheDocument();
    expect(getByTestId('rcs-two')).toBeInTheDocument();
  });

  it('Should render custom handle and style.', () => {
    const style = { width: '100%', height: '100%' };
    const handleTestId = 'youcanthandlethis';
    const Handle = () => <ReactCompareSliderHandle data-testid={handleTestId} />;

    const { getByTestId } = render(
      <ReactCompareSlider
        style={style}
        boundsPadding={100}
        handle={<Handle />}
        itemOne={<div>Foo</div>}
        itemTwo={<div>Bar</div>}
        position={75}
      />
    );

    expect(getByTestId(handleTestId)).toBeInTheDocument();
  });

  it('Should execute `onPositionChange` callback on main container interactions.', async () => {
    const testId = 'testaroo';
    const handlePositionChange = jest.fn();
    const style = { width: 1024, height: 768 };

    const { getByTestId } = render(
      <ReactCompareSlider
        data-testid={testId}
        style={style}
        itemOne={<img src="https://via.placeholder.com/1024x768" style={style} />}
        itemTwo={<img src="https://via.placeholder.com/1024x768" style={style} />}
        onPositionChange={handlePositionChange}
      />
    );

    const component = getByTestId(testId);
    fireEvent.mouseMove(component, { clientX: 100, clientY: 20 });
    fireEvent.mouseDown(component, { clientX: 250, clientY: 20 });
    fireEvent.mouseMove(component, { clientX: 100, clientY: 20 });
    fireEvent.mouseUp(component, { clientX: 100, clientY: 20 });
    // mousedown + mousemove + mouseup,
    expect(handlePositionChange).toHaveBeenCalledTimes(3);
  });

  it('Should only execute `onPositionChange` callback on handle interactions when using `onlyHandleDraggable`.', async () => {
    const componentTestId = 'testaroo';
    const handleTestId = 'youcanthandlethis';
    const handlePositionChange = jest.fn();
    const style = { width: 1024, height: 768 };
    const Handle = () => <ReactCompareSliderHandle data-testid={handleTestId} />;

    const { getByTestId } = render(
      <ReactCompareSlider
        data-testid={componentTestId}
        style={style}
        itemOne={<img src="https://via.placeholder.com/1024x768" style={style} />}
        itemTwo={<img src="https://via.placeholder.com/1024x768" style={style} />}
        handle={<Handle />}
        onlyHandleDraggable
        onPositionChange={handlePositionChange}
      />
    );

    const component = getByTestId(componentTestId);
    fireEvent.mouseDown(component, { clientX: 250, clientY: 20 });
    fireEvent.mouseMove(component, { clientX: 100, clientY: 20 });
    fireEvent.mouseUp(component, { clientX: 100, clientY: 20 });
    // We expect the position to be called once on mount.
    expect(handlePositionChange).toHaveBeenCalledTimes(1);

    const handle = getByTestId(handleTestId);
    fireEvent.mouseDown(handle, { clientX: 250, clientY: 20 });
    fireEvent.mouseMove(handle, { clientX: 100, clientY: 20 });
    fireEvent.mouseUp(handle, { clientX: 100, clientY: 20 });
    // mousedown + mousemove + mouseup,
    expect(handlePositionChange).toHaveBeenCalledTimes(3);
  });
});
