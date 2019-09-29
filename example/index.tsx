/* eslint no-console: 0 */

import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  styleFitContainer,
} from '../.';

/**
 * Example custom image using `styleFitContainer`
 */
const Img: React.FC<any> = ({ style, ...props }) => (
  <img {...props} style={{ ...styleFitContainer(), ...style }} />
);

const App = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '50vh',
          overflow: 'hidden',
        }}
      >
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
          onChange={position => console.log(`Portrait position: ${position}`)}
          portrait
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '50vh',
          overflow: 'hidden',
        }}
      >
        <ReactCompareSlider
          handle={
            <div
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/2208836/pexels-photo-2208836.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)`,
                backgroundPosition: 'center',
                width: '2rem',
                height: '100%',
              }}
            />
          }
          itemOne={
            <Img
              src="https://images.pexels.com/photos/2040626/pexels-photo-2040626.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              style={{ filter: 'blur(25px)' }}
              alt="one"
            />
          }
          itemTwo={
            <Img
              src="https://images.pexels.com/photos/2040626/pexels-photo-2040626.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="two"
            />
          }
          onChange={position => console.log(`Landscape position: ${position}`)}
        />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
