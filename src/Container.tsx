import React, { forwardRef } from 'react';
import type { CSSProperties, HTMLProps, ReactElement } from 'react';

import type { ReactCompareSliderCommonProps } from './types';

/** Container for clipped item. */
export const ContainerClip = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  (props, ref): ReactElement => {
    const style: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      userSelect: 'none',
      willChange: 'clip-path',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    };

    return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
  },
);

ContainerClip.displayName = 'ContainerClip';

/** Container to control the handle's position. */
export const ContainerHandle = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement> &
    Pick<ReactCompareSliderCommonProps, 'disabled' | 'portrait' | 'position'>
>(({ children, disabled, portrait, position }, ref): ReactElement => {
  const style: CSSProperties = {
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
    transform: portrait ? `translate3d(0, -50% ,0)` : `translate3d(-50%, 0, 0)`,
    willChange: portrait ? 'top' : 'left',
  };

  return (
    <button
      ref={ref}
      aria-orientation={portrait ? 'vertical' : 'horizontal'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      data-rcs="handle-container"
      disabled={disabled}
      role="slider"
      style={style}
    >
      {children}
    </button>
  );
});

ContainerHandle.displayName = 'ThisHandleContainer';
