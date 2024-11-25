import React, { forwardRef } from 'react';
import type { CSSProperties, ComponentPropsWithoutRef, ReactElement } from 'react';

import type { ReactCompareSliderCommonProps } from './types';

type ContainerItemProps = ComponentPropsWithoutRef<'div'> &
  Pick<ReactCompareSliderCommonProps, 'transition'> & {
    shouldOverlap?: boolean;
    order?: number;
  };

/** Container for clipped item. */
export const ContainerItem = forwardRef<HTMLDivElement, ContainerItemProps>(
  ({ shouldOverlap, order, style, transition, ...props }, ref): ReactElement => {
    const appliedStyle: CSSProperties = {
      gridArea: '1 / 1 / 2 / 2',
      order,
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      transition: transition ? `clip-path ${transition}` : undefined,
      userSelect: 'none',
      willChange: 'clip-path, transition',
      zIndex: shouldOverlap ? 1 : undefined,
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      ...style,
    };

    return <div {...props} style={appliedStyle} data-rcs="clip-item" ref={ref} />;
  },
);

ContainerItem.displayName = 'ContainerItem';

type ContainerHandleProps = ComponentPropsWithoutRef<'button'> & ReactCompareSliderCommonProps;

/** Container to control the handle's position. */
export const ContainerHandle = forwardRef<HTMLButtonElement, ContainerHandleProps>(
  ({ children, disabled, portrait, position, transition }, ref): ReactElement => {
    const targetAxis = portrait ? 'top' : 'left';

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
      zIndex: 1,
      outline: 0,
      transform: portrait ? `translate3d(0, -50% ,0)` : `translate3d(-50%, 0, 0)`,
      transition: transition ? `${targetAxis} ${transition}` : undefined,
    };

    return (
      <button
        ref={ref}
        aria-label="Drag to move or focus and use arrow keys"
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
  },
);

ContainerHandle.displayName = 'ThisHandleContainer';
