'use client';

import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';
import { useEffect } from 'react';

import { EVENT_CAPTURE_PARAMS, EVENT_PASSIVE_PARAMS, useEventListener } from './internal-hooks';
import { useReactCompareSliderContext } from './provider';
import { ReactCompareSliderCssVars } from '../consts';

export type RootProps = ComponentPropsWithoutRef<'div'>;

const currentPositionCssValue = `clamp(var(${ReactCompareSliderCssVars.boundsPadding}), var(${ReactCompareSliderCssVars.rawPosition}) - var(${ReactCompareSliderCssVars.boundsPadding}) + var(${ReactCompareSliderCssVars.boundsPadding}), calc(100% - var(${ReactCompareSliderCssVars.boundsPadding})))`;

/**
 * The root container of the slider.
 */
export const Root: FC<RootProps> = ({ style, ...props }) => {
  const {
    browsingContext,
    boundsPadding,
    changePositionOnHover,
    clip,
    isDragging,
    portrait,
    position,
    onTouchEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    interactiveTarget,
    rootRef,
    hasBrowsingContextBinding,
  } = useReactCompareSliderContext();

  const appliedStyle = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'grid',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
    touchAction: 'pan-y',
    userSelect: 'none',
    KhtmlUserSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    [ReactCompareSliderCssVars.rawPosition]: `${position.current}%`,
    [ReactCompareSliderCssVars.boundsPadding]: boundsPadding,
    [ReactCompareSliderCssVars.currentPosition]: currentPositionCssValue,
    ...style,
  } as CSSProperties;

  useEventListener('touchend', onTouchEnd, interactiveTarget, EVENT_CAPTURE_PARAMS);
  useEventListener('pointerdown', onPointerDown, interactiveTarget, EVENT_CAPTURE_PARAMS);

  // Handle hover events on the container.
  useEffect(() => {
    const containerRef = rootRef.current as HTMLDivElement;

    const handlePointerLeave = (ev: PointerEvent): void => {
      if (isDragging) return;
      onPointerUp(ev);
    };

    if (changePositionOnHover) {
      containerRef.addEventListener('pointermove', onPointerMove, EVENT_PASSIVE_PARAMS);
      containerRef.addEventListener('pointerleave', handlePointerLeave, EVENT_PASSIVE_PARAMS);
    }

    return () => {
      containerRef.removeEventListener('pointermove', onPointerMove);
      containerRef.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [changePositionOnHover, onPointerMove, onPointerUp, isDragging, rootRef]);

  // Allow drag outside of container while pointer is still down.
  useEffect(() => {
    if (isDragging && !hasBrowsingContextBinding.current) {
      browsingContext.addEventListener('pointermove', onPointerMove, EVENT_PASSIVE_PARAMS);
      browsingContext.addEventListener('pointerup', onPointerUp, EVENT_PASSIVE_PARAMS);
      hasBrowsingContextBinding.current = true;
    }

    return () => {
      if (hasBrowsingContextBinding.current) {
        browsingContext.removeEventListener('pointermove', onPointerMove);
        browsingContext.removeEventListener('pointerup', onPointerUp);
        hasBrowsingContextBinding.current = false;
      }
    };
  }, [onPointerMove, onPointerUp, isDragging, browsingContext, hasBrowsingContextBinding]);

  return (
    <div ref={rootRef} style={appliedStyle} data-rcs="root" data-rcs-clip={clip} data-testaroo {...props} />
  );
};
