'use client';

import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { styleFitContainer } from '../utils';

export type ImageProps = ComponentPropsWithoutRef<'img'>;

/** `img` element with defaults from `styleFitContainer` applied. */
export const Image = forwardRef<HTMLImageElement, ImageProps>(({ style, ...props }, ref) => {
  const appliedStyle = styleFitContainer(style);

  return <img ref={ref} {...props} style={appliedStyle} data-rcs="image" />;
});

Image.displayName = 'Image';
