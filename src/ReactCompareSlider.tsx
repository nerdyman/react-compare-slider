import React, { useEffect, useCallback, useRef, useState } from 'react';

import { ContainerClip, ContainerHandle } from './Container';
import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import type { ReactCompareSliderAllProps } from './types';
import {
  KeyboardEventKeys,
  useEventListener,
  usePrevious,
  UseResizeObserverHandlerParams,
  useResizeObserver,
} from './utils';

/** Properties for internal `updateInternalPosition` callback. */
interface UpdateInternalPositionProps
  extends Required<Pick<ReactCompareSliderAllProps, 'boundsPadding' | 'portrait'>> {
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
export const ReactCompareSlider: React.FC<ReactCompareSliderAllProps> = ({
  handle,
  itemOne,
  itemTwo,
  onlyHandleDraggable = false,
  onPositionChange,
  portrait = false,
  position = 50,
  boundsPadding = 0,
  changePositionOnHover = false,
  keyboardMovementIncrement = 20,
  style,
  ...props
}): React.ReactElement => {
  /** DOM node of the root element. */
  const rootContainerRef = useRef<HTMLDivElement>(null);
  /** DOM node of the item that is clipped. */
  const clipContainerRef = useRef<HTMLDivElement>(null);
  /** DOM node of the handle container. */
  const handleContainerRef = useRef<HTMLButtonElement>(null);
  /** Current position as a percentage value (initially negative to sync bounds on mount). */
  const internalPositionPc = useRef(position);
  /** Previous `position` prop value. */
  const prevPropPosition = usePrevious(position);
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
  /** Whether component has a `window` event binding. */
  const hasWindowBinding = useRef(false);
  /** Target container for pointer events. */
  const [interactiveTarget, setInteractiveTarget] = useState<HTMLElement | null>();
  /** Whether the bounds of the container element have been synchronised. */
  const [didSyncBounds, setDidSyncBounds] = useState(false);

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
      const { top, left, width, height } = (
        rootContainerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      // Early out if width or height are zero, can't calculate values
      // from zeros.
      if (width === 0 || height === 0) return;

      /**
       * Pixel position clamped within the container's bounds.
       * @NOTE This does *not* take `boundsPadding` into account because we need
       *       the full coords to correctly position the handle.
       */
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

      /** Width or height with CSS scaling accounted for. */
      const zoomScale = _portrait
        ? height / ((rootContainerRef.current as HTMLDivElement).offsetHeight || 1)
        : width / ((rootContainerRef.current as HTMLDivElement).offsetWidth || 1);

      const adjustedPosition = positionPx / zoomScale;
      const adjustedWidth = width / zoomScale;
      const adjustedHeight = height / zoomScale;

      /**
       * Internal position percentage *without* bounds.
       * @NOTE This uses the entire container bounds **without** `boundsPadding`
       *       to get the *real* bounds.
       */
      const nextInternalPositionPc =
        (adjustedPosition / (_portrait ? adjustedHeight : adjustedWidth)) * 100;

      /** Whether the current pixel position meets the min/max bounds. */
      const positionMeetsBounds = _portrait
        ? adjustedPosition === 0 || adjustedPosition === adjustedHeight
        : adjustedPosition === 0 || adjustedPosition === adjustedWidth;

      const canSkipPositionPc =
        nextInternalPositionPc === internalPositionPc.current &&
        (internalPositionPc.current === 0 || internalPositionPc.current === 100);

      // Early out if pixel and percentage positions are already at the min/max
      // to prevent update spamming when the user is sliding outside of the
      // container.
      if (didSyncBounds && canSkipPositionPc && positionMeetsBounds) {
        return;
      } else {
        setDidSyncBounds(true);
      }

      // Set new internal position.
      internalPositionPc.current = nextInternalPositionPc;

      /** Pixel position clamped to extremities *with* bounds padding. */
      const clampedPx = Math.min(
        // Get largest from pixel position *or* bounds padding.
        Math.max(adjustedPosition, 0 + _boundsPadding),
        // Use height *or* width based on orientation.
        (_portrait ? adjustedHeight : adjustedWidth) - _boundsPadding
      );

      (handleContainerRef.current as HTMLButtonElement).setAttribute(
        'aria-valuenow',
        `${Math.round(internalPositionPc.current)}`
      );

      (clipContainerRef.current as HTMLElement).style.clipPath = _portrait
        ? `inset(${clampedPx}px 0 0 0)`
        : `inset(0 0 0 ${clampedPx}px)`;

      (handleContainerRef.current as HTMLElement).style.transform = _portrait
        ? `translate3d(0,calc(-50% + ${clampedPx}px),0)`
        : `translate3d(calc(-50% + ${clampedPx}px),0,0)`;

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [didSyncBounds, onPositionChange]
  );

  // Update internal position when other user controllable props change.
  useEffect(() => {
    const { width, height } = (
      rootContainerRef.current as HTMLDivElement
    ).getBoundingClientRect();

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
      updateInternalPosition({
        portrait,
        boundsPadding,
        isOffset: true,
        x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
        y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
      });
    },
    [portrait, boundsPadding, updateInternalPosition]
  );

  /** Handle mouse/touch up. */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /** Resync internal position on resize. */
  const handleResize: (resizeProps: UseResizeObserverHandlerParams) => void = useCallback(
    ({ width, height }) => {
      const { width: scaledWidth, height: scaledHeight } = (
        rootContainerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      updateInternalPosition({
        portrait,
        boundsPadding,
        x: ((width / 100) * internalPositionPc.current * scaledWidth) / width,
        y: ((height / 100) * internalPositionPc.current * scaledHeight) / height,
      });
    },
    [portrait, boundsPadding, updateInternalPosition]
  );

  /**
   * Yo dawg, we heard you like handles, so we handled in your handle so you can handle
   * while you handle.
   */
  const handleHandleClick = useCallback((ev: MouseEvent) => {
    ev.stopPropagation();
    (handleContainerRef.current as HTMLButtonElement).focus();
  }, []);

  /** Handle keyboard movment. */
  const handleKeydown = useCallback(
    (ev: KeyboardEvent) => {
      if (!Object.values(KeyboardEventKeys).includes(ev.key as KeyboardEventKeys)) return;
      ev.preventDefault();

      const { top, right, bottom, left } = (
        handleContainerRef.current as HTMLButtonElement
      ).getBoundingClientRect();

      const isIncrement =
        ev.key == KeyboardEventKeys.ARROW_UP || ev.key == KeyboardEventKeys.ARROW_RIGHT;

      const offsetX = isIncrement
        ? right - keyboardMovementIncrement
        : left + keyboardMovementIncrement;

      const offsetY = isIncrement
        ? top + keyboardMovementIncrement
        : bottom - keyboardMovementIncrement;

      updateInternalPosition({
        portrait,
        boundsPadding,
        x: portrait ? left : offsetX,
        y: portrait ? offsetY : top,
        isOffset: true,
      });
    },
    [boundsPadding, keyboardMovementIncrement, portrait, updateInternalPosition]
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

  // Handle hover events on the container.
  useEffect(() => {
    const containerRef = rootContainerRef.current as HTMLDivElement;

    const handleMouseLeave = () => {
      if (isDragging) return;
      handlePointerUp();
    };

    if (changePositionOnHover) {
      containerRef.addEventListener('mousemove', handlePointerMove, EVENT_PASSIVE_PARAMS);
      containerRef.addEventListener('mouseleave', handleMouseLeave, EVENT_PASSIVE_PARAMS);
    }

    return () => {
      containerRef.removeEventListener('mousemove', handlePointerMove);
      containerRef.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [changePositionOnHover, handlePointerMove, handlePointerUp, isDragging]);

  useEventListener(
    'keydown',
    handleKeydown,
    handleContainerRef.current as HTMLButtonElement,
    EVENT_CAPTURE_PARAMS
  );

  useEventListener(
    'click',
    handleHandleClick,
    handleContainerRef.current as HTMLButtonElement,
    EVENT_CAPTURE_PARAMS
  );

  useEventListener(
    'mousedown',
    handlePointerDown,
    interactiveTarget as HTMLDivElement,
    EVENT_CAPTURE_PARAMS
  );

  useEventListener(
    'touchstart',
    handlePointerDown,
    interactiveTarget as HTMLDivElement,
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
      {itemOne}
      <ContainerClip ref={clipContainerRef}>{itemTwo}</ContainerClip>

      <ContainerHandle
        portrait={portrait}
        ref={handleContainerRef}
        position={Math.round(internalPositionPc.current)}
      >
        {Handle}
      </ContainerHandle>
    </div>
  );
};
