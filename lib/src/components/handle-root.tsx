'use client';

import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';

import { useReactCompareSliderContext } from './context';
import { EVENT_CAPTURE_PARAMS, useEventListener } from './internal-hooks';
import { ReactCompareSliderCssVars } from '../consts';

export type HandleRootProps = ComponentPropsWithoutRef<'button'>;

/** Container to control the handle's position. */
export const HandleRoot: FC<HandleRootProps> = ({ style, ...props }) => {
  const { disabled, portrait, canTransition, transition, handleRootRef, onHandleRootClick, onKeyDown } =
    useReactCompareSliderContext();

  const appliedStyle: CSSProperties = {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    WebkitTapHighlightColor: 'transparent',
    position: 'absolute',
    contain: 'layout',
    top: portrait ? '-50%' : undefined,
    left: portrait ? undefined : `-50%`,
    width: '100%',
    height: '100%',
    background: 'none',
    border: 0,
    padding: 0,
    pointerEvents: 'none',
    appearance: 'none',
    outline: 0,
    zIndex: 1,
    translate: portrait
      ? `0 var(${ReactCompareSliderCssVars.rawPosition}) 0`
      : `var(${ReactCompareSliderCssVars.rawPosition}) 0 0`,
    backfaceVisibility: 'hidden',
    transition: canTransition && transition ? `translate ${transition}` : undefined,
    willChange: 'translate',
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
