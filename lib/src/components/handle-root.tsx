'use client';

import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';

import { useReactCompareSliderContext } from './context';
import { EVENT_CAPTURE_PARAMS, useEventListener } from './internal-hooks';
import { ReactCompareSliderCssVars } from '../consts';

export type HandleRootProps = ComponentPropsWithoutRef<'button'>;

/** Container to control the handle's position. */
export const HandleRoot: FC<HandleRootProps> = ({ style, ...props }) => {
  const { disabled, portrait, transition, handleRootRef, onHandleRootClick, onKeyDown } =
    useReactCompareSliderContext();

  const targetAxis = portrait ? 'top' : 'left';

  const appliedStyle: CSSProperties = {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    WebkitTapHighlightColor: 'transparent',
    position: 'absolute',
    contain: 'layout',
    top: portrait ? `var(${ReactCompareSliderCssVars.currentPosition})` : '0',
    left: portrait ? '0' : `var(${ReactCompareSliderCssVars.currentPosition})`,
    width: portrait ? '100%' : undefined,
    height: portrait ? undefined : '100%',
    background: 'none',
    border: 0,
    padding: 0,
    pointerEvents: 'all',
    appearance: 'none',
    outline: 0,
    zIndex: 1,
    translate: portrait ? '0 -50% 0' : '-50% 0 0',
    // transform: portrait ? `translate3d(0, -50% ,0)` : `translate3d(-50%, 0, 0)`,
    backfaceVisibility: 'hidden',
    transition: transition ? `${targetAxis} ${transition}` : undefined,
    willChange: portrait ? 'top' : 'left',
    ...style,
  };

  useEventListener('keydown', onKeyDown, handleRootRef.current, EVENT_CAPTURE_PARAMS);
  useEventListener('click', onHandleRootClick, handleRootRef.current, EVENT_CAPTURE_PARAMS);

  return (
    <button
      ref={handleRootRef}
      aria-label="Drag to move or focus and use arrow keys"
      aria-orientation={portrait ? 'vertical' : 'horizontal'}
      aria-valuemin={0}
      aria-valuemax={100}
      data-rcs="handle-container"
      disabled={disabled}
      role="slider"
      style={appliedStyle}
      {...props}
    />
  );
};
