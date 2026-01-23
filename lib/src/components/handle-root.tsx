'use client';

import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';

import { EVENT_CAPTURE_PARAMS, useEventListener } from './internal-hooks';
import { useReactCompareSliderContext } from './provider';
import { ReactCompareSliderCssVars } from '../consts';

export type HandleRootProps = ComponentPropsWithoutRef<'div'>;

/** Container to control the handle's position. */
export const HandleRoot: FC<HandleRootProps> = ({ style, ...props }) => {
  const {
    disabled,
    portrait,
    canTransition,
    transition,
    handleRootRef,
    onHandleRootClick,
    onHandleRootKeyDown,
  } = useReactCompareSliderContext();

  const appliedStyle: CSSProperties = {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    WebkitTapHighlightColor: 'transparent',
    boxSizing: 'border-box',
    position: 'absolute',
    display: 'flex',
    flexDirection: portrait ? 'row' : 'column',
    placeItems: 'center',
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
      ? `0 var(${ReactCompareSliderCssVars.currentPosition}) 0`
      : `var(${ReactCompareSliderCssVars.currentPosition}) 0 0`,
    backfaceVisibility: 'hidden',
    transition: canTransition && transition ? `translate ${transition}` : undefined,
    willChange: 'translate',
    ...style,
  };

  useEventListener('keydown', onHandleRootKeyDown, handleRootRef.current, EVENT_CAPTURE_PARAMS);
  useEventListener('click', onHandleRootClick, handleRootRef.current, EVENT_CAPTURE_PARAMS);

  return (
    <div
      ref={handleRootRef}
      tabIndex={0}
      aria-label="Click and drag or focus and use arrow keys to change the position of the slider"
      aria-orientation={portrait ? 'vertical' : 'horizontal'}
      aria-valuemin={0}
      aria-valuemax={100}
      data-rcs="handle-container"
      aria-disabled={disabled}
      role="slider"
      style={appliedStyle}
      {...props}
    />
  );
};
