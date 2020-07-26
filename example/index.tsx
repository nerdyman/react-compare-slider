/* eslint no-console: 0 */

import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  styleFitContainer,
} from '../.';

import { DemoSection } from './demo-blocks';

const App = () => {
  const [firstPortrait, setFirstPortrait] = React.useState(true);
  const [firstPosition, setFirstPosition] = React.useState(50);

  const handlePositionChange = React.useCallback((position) => {
    console.log(`Position: ${position}`);
  }, []);

  const handleFirstClick = React.useCallback(
    () => setFirstPortrait((portrait) => !portrait),
    []
  );

  return (
    <>
      <DemoSection
        title="Using <code>ReactCompareSliderImage</code>"
        description="In <code>portrait</code> mode, using <code>ReactCompareSliderImage</code> to fit parent container and provide a fallback for browsers that don't support CSS <code>object-fit</code>."
      >
        <div>
          <input
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
        description="Using <code>styleFitContainer</code> to fit parent container, <em>does not</em> provide fallback image."
      >
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
              style={{ ...styleFitContainer() }}
              src="https://images.pexels.com/photos/2040626/pexels-photo-2040626.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="two"
            />
          }
          onPositionChange={handlePositionChange}
        />
      </DemoSection>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
