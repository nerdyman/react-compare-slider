'use client';

import type { ComponentProps, FC } from 'react';

import { styleFitContainer } from '../utils';

export type ImageProps = ComponentProps<'img'>;

/** `img` element with default styles applied by `styleFitContainer`. */
export const Image: FC<ImageProps> = ({ alt, style, ref, ...props }) => {
  const appliedStyle = styleFitContainer(style);

  return <img ref={ref} {...props} alt={alt} style={appliedStyle} data-rcs="image" />;
};
