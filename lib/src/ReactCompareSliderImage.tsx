import React from 'react';
import type { CSSProperties, ImgHTMLAttributes, ReactElement } from 'react';
import { forwardRef } from 'react';

import { styleFitContainer } from './utils';

/** Props for `ReactCompareSliderImage`. */
export type ReactCompareSliderImageProps = ImgHTMLAttributes<HTMLImageElement>;

/** `Img` element with defaults from `styleFitContainer` applied. */
export const ReactCompareSliderImage = forwardRef<HTMLImageElement, ReactCompareSliderImageProps>(
  ({ style, ...props }, ref): ReactElement => {
    const rootStyle: CSSProperties = styleFitContainer(style);

    return <img ref={ref} {...props} style={rootStyle} data-rcs="image" />;
  },
);

ReactCompareSliderImage.displayName = 'ReactCompareSliderImage';
