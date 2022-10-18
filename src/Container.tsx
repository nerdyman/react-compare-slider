import React, { forwardRef } from 'react';

import type { ReactCompareSliderCommonProps } from './types';

/** Container for clipped item. */
export const ContainerClip = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref): React.ReactElement => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      willChange: 'clip-path',
      userSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    };

    return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
  }
);

ContainerClip.displayName = 'ContainerClip';

/** Container to control the handle's position. */
export const ContainerHandle = forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement> &
    Pick<ReactCompareSliderCommonProps, 'portrait' | 'position'>
>(({ children, portrait, position }, ref): React.ReactElement => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    width: portrait ? '100%' : undefined,
    height: portrait ? undefined : '100%',
    background: 'none',
    border: 0,
    padding: 0,
    pointerEvents: 'all',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 0,
  };

  return (
    <button
      ref={ref}
      aria-orientation={portrait ? 'vertical' : 'horizontal'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      data-rcs="handle-container"
      role="slider"
      style={style}
    >
      {children}
    </button>
  );
});

ContainerHandle.displayName = 'ThisHandleContainer';
