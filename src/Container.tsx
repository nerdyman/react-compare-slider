import React, { forwardRef } from 'react';
import type { CSSProperties, HTMLProps } from 'react';

import type { ReactCompareSliderCommonProps, ReactCompareSliderProps } from './types';

type ContainerBaseProps = Pick<ReactCompareSliderProps, 'transition'>;

/** Container for clipped item. */
export const ContainerClip = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & ContainerBaseProps
>(({ transition, ...props }, ref) => {
  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: transition ? `clip ${transition}` : undefined,
    willChange: 'clip',
    userSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
});

ContainerClip.displayName = 'ContainerClip';

/** Container to control the handle position. */
export const ContainerHandle = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> &
    Pick<ReactCompareSliderCommonProps, 'portrait'> &
    ContainerBaseProps
>(({ children, portrait, transition }, ref) => {
  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    transition: transition ? `transform ${transition}` : undefined,
  };

  const innerStyle: CSSProperties = {
    position: 'absolute',
    width: portrait ? '100%' : undefined,
    height: portrait ? undefined : '100%',
    transform: portrait ? 'translateY(-50%)' : 'translateX(-50%)',
    pointerEvents: 'all',
  };

  return (
    <div style={style} data-rcs="handle-container" ref={ref}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
});

ContainerHandle.displayName = 'ContainerHandle';
