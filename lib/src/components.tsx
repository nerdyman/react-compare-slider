import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';
import { useCallback, useEffect } from 'react';

import {
  EVENT_CAPTURE_PARAMS,
  EVENT_PASSIVE_PARAMS,
  ReactCompareSliderClipOption,
  ReactCompareSliderCssVars,
} from './consts';
import { useReactCompareSliderContext } from './context';
import type { ReactCompareSliderClip, ReactCompareSliderProps } from './types';
import { useEventListener } from './utils';

export type RootProps = ComponentPropsWithoutRef<'div'>;

const currentPositionCssValue = `clamp(var(${ReactCompareSliderCssVars.boundsPadding}), var(${ReactCompareSliderCssVars.rawPosition}), calc(100% - var(${ReactCompareSliderCssVars.boundsPadding})))`;

export const Root: FC<RootProps> = ({ style, ...props }) => {
  const {
    browsingContext,
    changePositionOnHover,
    clip,
    isDragging,
    portrait,
    onTouchEnd,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    interactiveTarget,
    rootRef,
    handleRootRef,
    hasBrowsingContextBinding,
  } = useReactCompareSliderContext();

  const appliedStyle = {
    position: 'relative',
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
    [ReactCompareSliderCssVars.currentPosition]: currentPositionCssValue,
    ...style,
  } as CSSProperties;

  // TODO: Move this to context so it can be overridden?
  const onHandleRootClick = useCallback((ev: PointerEvent) => {
    ev.preventDefault();
    (ev.currentTarget as HTMLButtonElement).focus();
  }, []);

  useEventListener('touchend', onTouchEnd, interactiveTarget, EVENT_CAPTURE_PARAMS);
  useEventListener('keydown', onKeyDown, handleRootRef.current, EVENT_CAPTURE_PARAMS);
  useEventListener('click', onHandleRootClick, handleRootRef.current, EVENT_CAPTURE_PARAMS);
  useEventListener('pointerdown', onPointerDown, interactiveTarget, EVENT_CAPTURE_PARAMS);

  // Handle hover events on the container.
  useEffect(() => {
    const containerRef = rootRef.current;

    if (!containerRef) return;

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

type GetClipPathProps = Pick<ReactCompareSliderProps, 'portrait'> & {
  itemClip?: Extract<ReactCompareSliderClip, 'itemOne' | 'itemTwo'>;
};

const getClipPath = ({ itemClip, portrait }: GetClipPathProps): CSSProperties['clipPath'] => {
  if (itemClip === ReactCompareSliderClipOption.itemOne) {
    return portrait
      ? `inset(0px 0px calc(100% - var(${ReactCompareSliderCssVars.currentPosition})) 0px)`
      : `inset(0px calc(100% - var(${ReactCompareSliderCssVars.currentPosition})) 0px 0px)`;
  }

  if (itemClip === ReactCompareSliderClipOption.itemTwo) {
    return portrait
      ? `inset(var(${ReactCompareSliderCssVars.currentPosition}) 0px 0px 0px)`
      : `inset(0px 0px 0px var(${ReactCompareSliderCssVars.currentPosition}))`;
  }

  return 'none';
};

export type ContainerItemProps = ComponentPropsWithoutRef<'div'> & {
  item?: Extract<ReactCompareSliderClip, 'itemOne' | 'itemTwo'>;
};

/** Container to clip children. */
export const Item: FC<ContainerItemProps> = ({ item, style, ...props }) => {
  const { clip, portrait, transition } = useReactCompareSliderContext();

  const shouldClip = clip === ReactCompareSliderClipOption.both || clip === item;
  const itemClip = shouldClip ? item : undefined;

  const appliedStyle: CSSProperties = {
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    WebkitPerspective: 1000,
    gridArea: '1 / 1',
    maxWidth: '100%',
    overflow: 'hidden',
    clipPath: getClipPath({ itemClip, portrait }),
    boxSizing: 'border-box',
    transform: 'translateZ(0)',
    transition: transition ? `clip-path ${transition}` : undefined,
    userSelect: 'none',
    willChange: 'clip-path',
    zIndex: item === ReactCompareSliderClipOption.itemOne ? 1 : undefined,
    ...style,
  };

  return <div {...props} style={appliedStyle} data-rcs="clip-item" data-rcs-item={item} />;
};

export type HandleRootProps = ComponentPropsWithoutRef<'button'>;

/** Container to control the handle's position. */
export const HandleRoot: FC<HandleRootProps> = ({ style, ...props }) => {
  const { disabled, portrait, transition, handleRootRef } = useReactCompareSliderContext();

  const targetAxis = portrait ? 'top' : 'left';

  const appliedStyle: CSSProperties = {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    position: 'absolute',
    top: portrait ? `var(${ReactCompareSliderCssVars.currentPosition})` : '0',
    left: portrait ? '0' : `var(${ReactCompareSliderCssVars.currentPosition})`,
    width: portrait ? '100%' : undefined,
    height: portrait ? undefined : '100%',
    background: 'none',
    border: 0,
    padding: 0,
    pointerEvents: 'all',
    appearance: 'none',
    zIndex: 1,
    outline: 0,
    transform: portrait ? `translate3d(0, -50% ,0)` : `translate3d(-50%, 0, 0)`,
    backfaceVisibility: 'hidden',
    transition: transition ? `${targetAxis} ${transition}` : undefined,
    willChange: portrait ? 'top' : 'left',
    ...style,
  };

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
      // This is replaced dynamically
      aria-valuenow={0}
      style={appliedStyle}
      {...props}
    />
  );
};
