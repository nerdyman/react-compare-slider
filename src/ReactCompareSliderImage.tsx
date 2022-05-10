import React from 'react';
import type { CSSProperties, FC } from 'react';

import type { ReactCompareSliderImageProps } from './types';
import { styleFitContainer } from './utils';

/** Image with defaults from `styleFitContainer` applied. */
export const ReactCompareSliderImage: FC<ReactCompareSliderImageProps> = ({
  style,
  ...props
}) => {
  const rootStyle: CSSProperties = styleFitContainer(style);

  return <img {...props} style={rootStyle} data-rcs="image" />;
};
