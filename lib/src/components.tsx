import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';
import { useEffect } from 'react';

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

/**
 * The root container of the slider.
 */
export const Root: FC<RootProps> = ({ style, ...props }) => {
  const {
    browsingContext,
    changePositionOnHover,
    clip,
    isDragging,
    portrait,
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

  useEventListener('touchend', onTouchEnd, interactiveTarget, EVENT_CAPTURE_PARAMS);
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

/**
 * Container for `itemOne  and `itemTwo`.
 */
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
    zIndex: item === ReactCompareSliderClipOption.itemOne ? 1 : undefined,
    willChange: 'clip-path',
    ...style,
  };

  return <div {...props} style={appliedStyle} data-rcs="clip-item" data-rcs-item={item} />;
};

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
