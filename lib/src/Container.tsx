import React, { forwardRef } from 'react';
import type { CSSProperties, ComponentPropsWithoutRef, ReactElement } from 'react';

import type { ReactCompareSliderCommonProps } from './types';

type ContainerItemProps = ComponentPropsWithoutRef<'div'> &
  Pick<ReactCompareSliderCommonProps, 'transition'> & {
    order?: number;
  };

/** Container for clipped item. */
export const ContainerItem = forwardRef<HTMLDivElement, ContainerItemProps>(
  ({ transition, order, ...props }, ref): ReactElement => {
    const style: CSSProperties = {
      gridArea: '1 / 1 / 2 / 2',
      order,
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      transition: transition ? `clip-path ${transition}` : undefined,
      userSelect: 'none',
      willChange: 'clip-path, transition',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    };

    return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
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
