'use client';

import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { styleFitContainer } from '../utils';

export type ImageProps = ComponentPropsWithoutRef<'img'>;

/** `img` element with default styles applied by `styleFitContainer`. */
export const Image = forwardRef<HTMLImageElement, ImageProps>(({ alt, style, ...props }, ref) => {
  const appliedStyle = styleFitContainer(style);

  return <img ref={ref} {...props} alt={alt} style={appliedStyle} data-rcs="image" />;
});

Image.displayName = 'Image';
