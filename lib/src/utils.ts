import type { CSSProperties } from 'react';

/**
 * Stand-alone CSS utility to make replaced elements (`img`, `video`, etc.) fit their container.
 */
export const styleFitContainer = ({
  display = 'block',
  width = '100%',
  height = '100%',
  maxWidth = '100%',
  boxSizing = 'border-box',
  objectFit = 'cover',
  objectPosition = 'center center',
  ...props
}: CSSProperties = {}): CSSProperties => ({
  display,
  width,
  height,
  maxWidth,
  boxSizing,
  objectFit,
  objectPosition,
  ...props,
});
