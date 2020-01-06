import React from 'react';

import { styleFitContainer } from './utils';

/**
 * Whether client supports the CSS `object-fit` property
 */
export const CLIENT_SUPPORTS_CSS_OBJECT_FIT: boolean =
  typeof CSS !== 'undefined' &&
  CSS.supports &&
  CSS.supports('object-fit', 'cover');

/**
 * Properties for `ReactCompareSliderImage`
 */
export interface ReactCompareSliderImageProps {
  /** Whether to disable fallback background-image */
  fallbackEnable?: boolean;
}

/**
 * Image with fallback background for browsers that don't support the
 * `object-fit` CSS property
 */
export const ReactCompareSliderImage: React.FC<React.ImgHTMLAttributes<
  HTMLImageElement
> &
  ReactCompareSliderImageProps> = ({
  className,
  fallbackEnable = true,
  style,
  ...props
}): React.ReactElement => {
  const innerStyle: React.CSSProperties = styleFitContainer({ ...style });
  const containerStyle: React.CSSProperties = {
    width: innerStyle.width,
    height: innerStyle.height,
  };

  // Add fallback background props if requested
  if (!CLIENT_SUPPORTS_CSS_OBJECT_FIT && fallbackEnable) {
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
