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
          --rcs-handle-width: 0.1rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--rcs-handle-width);
          height: 100%;
          box-shadow: none;
          background-color: #ffffff;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: calc(var(--rcs-handle-width) / 2);
            width: 3.5rem;
            height: 3.5rem;
            border: var(--rcs-handle-width) solid #ffffff;
            border-radius: 100%;
            transform: translate(-50%, -50%);
            backdrop-filter: blur(0.5rem);
          }
        `}
      >
        {/* Arrows */}
        <div
          css={css`
            position: relative;
            display: grid;
            grid-auto-flow: column;
            gap: 0.65rem;

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
        src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1500&q=80"
        alt="Image one"
        style={{ filter: 'grayscale(1)' }}
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src="https://images.unsplash.com/photo-1580458148391-8c4951dc1465?auto=format&fit=crop&w=1500&q=80"
        alt="Image two"
      />
    }
    style={{ width: '100%', height: '100vh' }}
  />
);
