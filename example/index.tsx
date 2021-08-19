/* eslint no-console: 0 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactCompareSlider, ReactCompareSliderImage, styleFitContainer } from '../src';

import { DemoSection } from './demo-blocks';

const App = () => {
  const [firstPortrait, setFirstPortrait] = React.useState(false);
  const [firstPosition, setFirstPosition] = React.useState(100);
  const [secondPortrait, setSecondPortrait] = React.useState(true);
  const [secondPosition, setSecondPosition] = React.useState(100);

  const handlePositionChange = React.useCallback((position) => {
    console.log(`Position: ${position}`);
  }, []);

  const handleFirstClick = React.useCallback(
    () => setFirstPortrait((portrait) => !portrait),
    []
  );

  const handleSecondClick = React.useCallback(
    () => setSecondPortrait((portrait) => !portrait),
    []
  );

  return (
    <>
      <DemoSection
        title="Using <code>ReactCompareSliderImage</code>"
        description="In <code>portrait</code> mode, using <code>ReactCompareSliderImage</code> to fit parent container."
      >
        <div style={{ marginBottom: '.5rem' }}>
          <label htmlFor="first-position">Position </label>
          <input
            id="first-position"
            value={firstPosition}
            type="number"
            onChange={(ev) => setFirstPosition(parseFloat(ev.target.value))}
            max={100}
            min={0}
          />
          <button onClick={handleFirstClick}>Toggle Portrait</button>
        </div>
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg"
              style={{ filter: 'blur(25px)' }}
              alt="one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg"
              alt="two"
            />
          }
          onPositionChange={handlePositionChange}
          portrait={firstPortrait}
          position={firstPosition}
        />
      </DemoSection>
      <DemoSection
        title="Using <code>styleFitContainer()</code>"
        description="Using <code>styleFitContainer</code> to fit parent container."
      >
        <div style={{ marginBottom: '.5rem' }}>
          <label htmlFor="second-position">Position </label>
          <input
            id="second-position"
            value={secondPosition}
            type="number"
            onChange={(ev) => setSecondPosition(parseFloat(ev.target.value))}
            max={100}
            min={0}
          />
          <button onClick={handleSecondClick}>Toggle Portrait</button>
        </div>

        <ReactCompareSlider
          itemOne={
            <img
              style={{ ...styleFitContainer(), filter: 'blur(0.75rem)' }}
              src="https://images.pexels.com/photos/2040626/pexels-photo-2040626.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="one"
            />
          }
          itemTwo={
            <img
              style={styleFitContainer()}
              src="https://images.pexels.com/photos/2040626/pexels-photo-2040626.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="two"
            />
          }
          onPositionChange={handlePositionChange}
          portrait={secondPortrait}
          position={secondPosition}
        />
      </DemoSection>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
