import React from 'react';
import type { FC, ImgHTMLAttributes } from 'react';

import { styleFitContainer } from './utils';

/** Props for `ReactCompareSliderImage`. */
export type ReactCompareSliderImageProps = ImgHTMLAttributes<HTMLImageElement>;

/** `Img` element with defaults from `styleFitContainer` applied. */
export const ReactCompareSliderImage: FC<ReactCompareSliderImageProps> = ({
  style,
  ...props
}): React.ReactElement => {
  const rootStyle: React.CSSProperties = styleFitContainer(style);

  return <img {...props} style={rootStyle} data-rcs="image" />;
};
