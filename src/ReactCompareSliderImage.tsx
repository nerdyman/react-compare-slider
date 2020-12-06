import React from 'react';

import { styleFitContainer } from './utils';

/** Props for `ReactCompareSliderImage`. */
export type ReactCompareSliderImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/** Image with defaults from `styleFitContainer` applied. */
export const ReactCompareSliderImage: React.FC<ReactCompareSliderImageProps> = ({
  style,
  ...props
}): React.ReactElement => {
  const rootStyle: React.CSSProperties = styleFitContainer(style);

  return <img {...props} style={rootStyle} data-rcs="image" />;
};
