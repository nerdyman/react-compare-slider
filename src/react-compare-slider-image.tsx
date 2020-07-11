import React, { useRef } from 'react';

import { styleFitContainer, supportsCssObjectFit } from './utils';

/**
 * Properties for `ReactCompareSliderImage`.
 */
export interface ReactCompareSliderImageProps {
  /** Whether to disable fallback background-image */
  fallbackEnable?: boolean;
}

/**
 * Image with fallback background for browsers that don't support the
 * `object-fit` CSS property.
 */
export const ReactCompareSliderImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & ReactCompareSliderImageProps
> = ({
  className,
  fallbackEnable = true,
  style,
  ...props
}): React.ReactElement => {
  /** Runtime support for `object-fit`. Ref based to allow updates after SSR. */
  const objectFitIsSupported = useRef(supportsCssObjectFit());
  const innerStyle: React.CSSProperties = styleFitContainer({ ...style });
  const containerStyle: React.CSSProperties = {
    width: innerStyle.width,
    height: innerStyle.height,
    boxSizing: 'border-box',
  };

  // Add fallback background props if requested
  if (!objectFitIsSupported.current && fallbackEnable) {
    // Set fallback CSS properties, use props from `innerStyle` if defined
    containerStyle.backgroundImage =
      innerStyle.backgroundImage || `url(${props.src})`;
    containerStyle.backgroundSize = innerStyle.backgroundSize || 'cover';
    containerStyle.backgroundPosition =
      innerStyle.backgroundPosition || 'center';
    // Hide inner image
    innerStyle.opacity = 0;
  }

  return (
    <div className={className} style={containerStyle} data-rcs="image-root">
      <img {...props} style={innerStyle} data-rcs="image-inner" />
    </div>
  );
};
