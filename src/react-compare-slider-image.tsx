import React from 'react';

import { styleFitContainer } from './utils';

/** Props for `ReactCompareSliderImage`. */
export type ReactCompareSliderImageProps = React.ImgHTMLAttributes<
  HTMLImageElement
>;

/**
 * Image with defaults from `styleFitContainer` applied.
 */
export const ReactCompareSliderImage: React.FC<ReactCompareSliderImageProps> = ({
  style,
  ...props
}): React.ReactElement => {
  /** Runtime support for `object-fit`. Ref based to allow updates after SSR. */
  const rootStyle: React.CSSProperties = styleFitContainer({
    boxSizing: 'border-box',
    ...style,
  });

  return <img {...props} style={rootStyle} data-rcs="image" />;
};
