import { forwardRef } from 'react';
import type { CSSProperties, ComponentPropsWithoutRef, ReactElement } from 'react';

import {
  ReactCompareSliderClipOption,
  type ReactCompareSliderClip,
  type ReactCompareSliderCommonProps,
  type ReactCompareSliderRootProps,
} from './types';

type GetClipPathProps = Pick<ReactCompareSliderRootProps, 'portrait'> & {
  item: Extract<ReactCompareSliderClip, 'itemOne' | 'itemTwo'>;
};

const getClipPath = ({ item, portrait }: GetClipPathProps): CSSProperties['clipPath'] => {
  if (item === ReactCompareSliderClipOption.itemOne) {
    return portrait
      ? 'inset(0px 0px calc(100% - var(--rcs-pos)) 0px)'
      : 'inset(0px calc(100% - var(--rcs-pos)) 0px 0px)';
  }

  if (item === ReactCompareSliderClipOption.itemTwo) {
    return portrait ? 'inset(var(--rcs-pos) 0px 0px 0px)' : 'inset(0px 0px 0px var(--rcs-pos))';
  }

  return 'none';
};

type ContainerItemProps = ComponentPropsWithoutRef<'div'> &
  Pick<ReactCompareSliderRootProps, 'clip' | 'portrait' | 'transition'> & {
    item: Extract<ReactCompareSliderClip, 'itemOne' | 'itemTwo'>;
  };

/** Container for clipped item. */
export const ContainerItem = forwardRef<HTMLDivElement, ContainerItemProps>(
  ({ clip, item, portrait, style, transition, ...props }, ref): ReactElement => {
    const appliedStyle: CSSProperties = {
      gridArea: '1 / 1',
      maxWidth: '100%',
      overflow: 'hidden',
      clipPath: getClipPath({ item, portrait }),
      boxSizing: 'border-box',
      transition: transition ? `clip-path ${transition}` : undefined,
      userSelect: 'none',
      willChange: 'clip-path, transition',
      zIndex: clip === ReactCompareSliderClipOption.itemOne ? 1 : undefined,
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
      top: portrait ? 'var(--rcs-pos)' : '0',
      left: portrait ? '0' : `var(--rcs-pos)`,
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
