'use client';

export type { ImageProps as ReactCompareImageProps } from './components';
// Image is aliased for backwards compatbility.
export { Image as ReactCompareSliderImage } from './components';
export { ReactCompareSliderClipOption, ReactCompareSliderCssVars } from './consts';
export { useReactCompareSlider } from './hooks';
export type { ReactCompareSliderHandleProps } from './ReactCompareSliderHandle';
export { ReactCompareSliderHandle } from './ReactCompareSliderHandle';

export { ReactCompareSlider } from './react-compare-slider';
export type {
  ReactCompareSliderClip,
  ReactCompareSliderDetailedProps,
  ReactCompareSliderPosition,
  ReactCompareSliderProps,
  UseReactCompareSliderProps,
  UseReactCompareSliderReturn,
} from './types';
export { styleFitContainer } from './utils';
