/* eslint no-console: 0 */
import React from 'react';
import css from '@emotion/css';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

export default {
  title: 'Demos/Handles',
  component: ReactCompareSlider,
};

export const BlurredArrows = () => (
  <ReactCompareSlider
    handle={
      <div
        css={css`
          --rcs-handle-width: 2px;
          --rcs-handle-box: 3.5rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--rcs-handle-width);
          height: 100%;
          box-shadow: none;
          background-color: #ffffff;
          cursor: pointer;
        `}
      >
        {/** Arrow Box @NOTE Using separate component to amplify blur */}
        <div
          css={css`
            position: absolute;
            width: var(--rcs-handle-box);
            height: var(--rcs-handle-box);
            border-radius: 100%;
            overflow: hidden;

            &::before,
            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              width: inherit;
              height: inherit;
              backdrop-filter: blur(0.5rem);
            }
          `}
        />

        {/* Arrows */}
        <div
          css={css`
            position: absolute;
            display: grid;
            align-items: center;
            justify-content: center;
            grid-auto-flow: column;
            width: var(--rcs-handle-box);
            height: var(--rcs-handle-box);
            border: var(--rcs-handle-width) solid #ffffff;
            gap: 0.65rem;
            backdrop-filter: blur(0.5rem);
            border-radius: 100%;
            overflow: hidden;

            &::before,
            &::after {
              content: '';
              display: block;
              width: 0;
              height: 0;
              top: 50%;
              left: 0;
              border-top: 0.5rem solid transparent;
              border-bottom: 0.5rem solid transparent;
            }

            &::before {
              border-right: 0.65rem solid #ffffff;
            }

            &::after {
              border-left: 0.65rem solid #ffffff;
            }
          `}
        />
      </div>
    }
    itemOne={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1280&q=80"
        style={{ filter: 'grayscale(1)' }}
        alt="one"
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1280&q=80"
        alt="two"
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);
