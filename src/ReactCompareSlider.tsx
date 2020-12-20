import React, { forwardRef, useEffect, useCallback, useRef, useState } from 'react';

import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import { ReactCompareSliderCommonProps, ReactCompareSliderPropPosition } from './types';

import {
  useEventListener,
  usePrevious,
  UseResizeObserverHandlerParams,
  useResizeObserver,
} from './utils';

/** Container for clipped item. */
const ThisClipContainer = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref): React.ReactElement => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      willChange: 'clip',
      userSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    };

    return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
  }
);

ThisClipContainer.displayName = 'ThisClipContainer';

/** Handle container to control position. */
const ThisHandleContainer = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & Pick<ReactCompareSliderCommonProps, 'portrait'>
>(
  ({ children, portrait }, ref): React.ReactElement => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    };

    const innerStyle: React.CSSProperties = {
      position: 'absolute',
      width: portrait ? '100%' : undefined,
      height: portrait ? undefined : '100%',
      transform: portrait ? 'translateY(-50%)' : 'translateX(-50%)',
      pointerEvents: 'all',
    };

    return (
      <div style={style} data-rcs="handle-container" ref={ref}>
        <div style={innerStyle}>{children}</div>
      </div>
    );
  }
);

ThisHandleContainer.displayName = 'ThisHandleContainer';

/** Comparison slider properties. */
export interface ReactCompareSliderProps extends Partial<ReactCompareSliderCommonProps> {
  /** Padding to limit the slideable bounds in pixels on the X-axis (landscape) or Y-axis (portrait). */
  boundsPadding?: number;
  /** Custom handle component. */
  handle?: React.ReactNode;
  /** First item to show. */
  itemOne: React.ReactNode;
  /** Second item to show. */
  itemTwo: React.ReactNode;
  /** Whether to only change position when handle is interacted with (useful for touch devices). */
  onlyHandleDraggable?: boolean;
  /** Callback on position change with position as percentage. */
  onPositionChange?: (position: ReactCompareSliderPropPosition) => void;
}

/** Properties for internal `updateInternalPosition` callback. */
interface UpdateInternalPositionProps
  extends Required<Pick<ReactCompareSliderProps, 'boundsPadding' | 'portrait'>> {
  /** X coordinate to update to (landscape). */
  x: number;
  /** Y coordinate to update to (portrait). */
  y: number;
  /** Whether to calculate using page X and Y offsets (required for pointer events). */
  isOffset?: boolean;
}

const EVENT_PASSIVE_PARAMS = { passive: true };
const EVENT_CAPTURE_PARAMS = { capture: true, passive: false };

/** Root Comparison slider. */
export const ReactCompareSlider: React.FC<
  ReactCompareSliderProps & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({
  handle,
  itemOne,
  itemTwo,
  onlyHandleDraggable = false,
  onPositionChange,
  portrait = false,
  position = 50,
  boundsPadding = 0,
  style,
  ...props
}): React.ReactElement => {
  /** Reference to root container. */
  const rootContainerRef = useRef<HTMLDivElement>(null);
  /** Reference to clip container. */
  const clipContainerRef = useRef<HTMLDivElement>(null);
  /** Reference to handle container. */
  const handleContainerRef = useRef<HTMLDivElement>(null);
  /** Reference to current position as a percentage value. */
  const internalPositionPc = useRef(position);
  /** Previous `position` prop value. */
  const prevPropPosition = usePrevious(position);
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
  /** Whether component has a `window` event binding. */
  const hasWindowBinding = useRef(false);
  /** Target container for pointer events. */
  const [interactiveTarget, setInteractiveTarget] = useState<HTMLDivElement | null>();

  // Set target container for pointer events.
  useEffect(() => {
    setInteractiveTarget(
      onlyHandleDraggable ? handleContainerRef.current : rootContainerRef.current
    );
  }, [onlyHandleDraggable]);

  /** Update internal position value. */
  const updateInternalPosition = useCallback(
    function updateInternalCall({
      x,
      y,
      isOffset,
      portrait: _portrait,
      boundsPadding: _boundsPadding,
    }: UpdateInternalPositionProps) {
      const {
        top,
        left,
        width,
        height,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = rootContainerRef.current!.getBoundingClientRect();

      // Early out if width or height are zero, can't calculate values
      // from zeros.
      if (width === 0 || height === 0) return;

      // Clamp pixel position to always be within the container's bounds.
      // This does *not* take `boundsPadding` into account because we need
      // the real coords to correctly position the handle.
      const positionPx = Math.min(
        Math.max(
          // Determine bounds based on orientation
          _portrait
            ? isOffset
              ? y - top - window.pageYOffset
              : y
            : isOffset
            ? x - left - window.pageXOffset
            : x,
          // Min value
          0
        ),
        // Max value
        _portrait ? height : width
      );

      /**
       * Internal position percentage *without* bounds.
       * @NOTE This uses the entire container bounds **without** `boundsPadding`
       *       to get the *real* bounds.
       */
      const nextInternalPositionPc = (positionPx / (_portrait ? height : width)) * 100;

      /** Determine if the current pixel position meets the min/max bounds. */
      const positionMeetsBounds = _portrait
        ? positionPx === 0 || positionPx === height
        : positionPx === 0 || positionPx === width;

      const canSkipPositionPc =
        nextInternalPositionPc === internalPositionPc.current &&
        (internalPositionPc.current === 0 || internalPositionPc.current === 100);

      // Early out if pixel and percentage positions are already at the min/max
      // to prevent update spamming when the user is sliding outside of the
      // container.
      if (canSkipPositionPc && positionMeetsBounds) {
        return;
      }

      // Set new internal position.
      internalPositionPc.current = nextInternalPositionPc;

      /** Pixel position clamped to extremities *with* bounds padding. */
      const clampedPx = Math.min(
        // Get largest from pixel position *or* bounds padding.
        Math.max(positionPx, 0 + _boundsPadding),
        // Use height *or* width based on orientation.
        (_portrait ? height : width) - _boundsPadding
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clipContainerRef.current!.style.clip = _portrait
        ? `rect(auto,auto,${clampedPx}px,auto)`
        : `rect(auto,${clampedPx}px,auto,auto)`;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      handleContainerRef.current!.style.transform = _portrait
        ? `translate3d(0,${clampedPx}px,0)`
        : `translate3d(${clampedPx}px,0,0)`;

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [onPositionChange]
  );

  // Update internal position when other user controllable props change.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { width, height } = rootContainerRef.current!.getBoundingClientRect();

    // Use current internal position if `position` hasn't changed.
    const nextPosition =
      position === prevPropPosition ? internalPositionPc.current : position;

    updateInternalPosition({
      portrait,
      boundsPadding,
      x: (width / 100) * nextPosition,
      y: (height / 100) * nextPosition,
    });
  }, [portrait, position, prevPropPosition, boundsPadding, updateInternalPosition]);

  /** Handle mouse/touch down. */
  const handlePointerDown = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();

      updateInternalPosition({
        portrait,
        boundsPadding,
        isOffset: true,
        x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
        y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
      });

      setIsDragging(true);
    },
    [portrait, boundsPadding, updateInternalPosition]
  );

  /** Handle mouse/touch move. */
  const handlePointerMove = useCallback(
    function moveCall(ev: MouseEvent | TouchEvent) {
      if (!isDragging) return;

      updateInternalPosition({
        portrait,
        boundsPadding,
        isOffset: true,
        x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
        y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
      });
    },
    [portrait, isDragging, boundsPadding, updateInternalPosition]
  );

  /** Handle mouse/touch up. */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /** Resync internal position on resize. */
  const handleResize = useCallback(
    ({ width, height }: UseResizeObserverHandlerParams) => {
      updateInternalPosition({
        portrait,
        boundsPadding,
        x: (width / 100) * internalPositionPc.current,
        y: (height / 100) * internalPositionPc.current,
      });
    },
    [portrait, boundsPadding, updateInternalPosition]
  );

  // Allow drag outside of container while pointer is still down.
  useEffect(() => {
    if (isDragging && !hasWindowBinding.current) {
      window.addEventListener('mousemove', handlePointerMove, EVENT_PASSIVE_PARAMS);
      window.addEventListener('mouseup', handlePointerUp, EVENT_PASSIVE_PARAMS);
      window.addEventListener('touchmove', handlePointerMove, EVENT_PASSIVE_PARAMS);
      window.addEventListener('touchend', handlePointerUp, EVENT_PASSIVE_PARAMS);
      hasWindowBinding.current = true;
    }

    return (): void => {
      if (hasWindowBinding.current) {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('touchend', handlePointerUp);
        hasWindowBinding.current = false;
      }
    };
  }, [handlePointerMove, handlePointerUp, isDragging]);

  // Bind resize observer to container.
  useResizeObserver(rootContainerRef, handleResize);

  useEventListener(
    'mousedown',
    handlePointerDown,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    interactiveTarget!,
    EVENT_CAPTURE_PARAMS
  );

  useEventListener(
    'touchstart',
    handlePointerDown,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    interactiveTarget!,
    EVENT_CAPTURE_PARAMS
  );

  // Use custom handle if requested.
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
    userSelect: 'none',
    KhtmlUserSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    ...style,
  };

  return (
    <div {...props} ref={rootContainerRef} style={rootStyle} data-rcs="root">
      {itemTwo}
      <ThisClipContainer ref={clipContainerRef}>{itemOne}</ThisClipContainer>
      <ThisHandleContainer portrait={portrait} ref={handleContainerRef}>
        {Handle}
      </ThisHandleContainer>
    </div>
  );
};
