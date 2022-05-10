import React, { useEffect, useCallback, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';

import { ContainerClip, ContainerHandle } from './Container';
import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import { ReactCompareSliderProps, ReactCompareSliderDetailedProps } from './types';
import {
  useEventListener,
  UseResizeObserverHandlerParams,
  useResizeObserver,
} from './utils';

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
export const ReactCompareSlider: FC<ReactCompareSliderDetailedProps> = ({
  handle,
  itemOne,
  itemTwo,
  onlyHandleDraggable = false,
  onPositionChange,
  portrait = false,
  position = 50,
  boundsPadding = 0,
  changePositionOnHover = false,
  style,
  transition,
  ...props
}) => {
  /** DOM node of the root element. */
  const rootContainerRef = useRef<HTMLDivElement>(null);
  /** DOM node of the item that is clipped. */
  const clipContainerRef = useRef<HTMLDivElement>(null);
  /** DOM node of the handle container. */
  const handleContainerRef = useRef<HTMLDivElement>(null);
  /** Current position as a percentage value (initially negative to sync bounds on mount). */
  const internalPositionPc = useRef(position);
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
  /** Whether component has a `window` event binding. */
  const hasWindowBinding = useRef(false);
  /** Whether the `transition` property can be applied. */
  const [canTransition, setCanTransition] = useState(false);
  /** Target container for pointer events. */
  const [interactiveTarget, setInteractiveTarget] = useState<HTMLDivElement | null>();
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

      (clipContainerRef.current as HTMLElement).style.clip = _portrait
        ? `rect(auto,auto,${clampedPx}px,auto)`
        : `rect(auto,${clampedPx}px,auto,auto)`;

      (handleContainerRef.current as HTMLElement).style.transform = _portrait
        ? `translate3d(0,${clampedPx}px,0)`
        : `translate3d(${clampedPx}px,0,0)`;

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [didSyncBounds, onPositionChange]
  );

  // Update internal position when other user controllable props change.
  useEffect(() => {
    const { width, height } = (
      rootContainerRef.current as HTMLDivElement
    ).getBoundingClientRect();

    updateInternalPosition({
      portrait,
      boundsPadding,
      x: (width / 100) * position,
      y: (height / 100) * position,
    });
  }, [portrait, position, boundsPadding, updateInternalPosition]);

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
      setCanTransition(true);
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

      setCanTransition(false);
    },
    [portrait, boundsPadding, updateInternalPosition]
  );

  /** Handle mouse/touch up. */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    // We want to allow `position` changes to transition if `transition` prop is passed.
    setCanTransition(true);
  }, []);

  /** Resync internal position on resize. */
  const handleResize = useCallback(
    ({ width, height }: UseResizeObserverHandlerParams) => {
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

  // Bind resize observer to container.
  useResizeObserver(rootContainerRef, handleResize);

  useEventListener(
    'pointerdown',
    handlePointerDown,
    interactiveTarget as HTMLDivElement,
    EVENT_CAPTURE_PARAMS
  );

  // Allow drag outside of container while pointer is still down.
  useEffect(() => {
    if (isDragging && !hasWindowBinding.current) {
      window.addEventListener('pointermove', handlePointerMove, EVENT_PASSIVE_PARAMS);
      window.addEventListener('pointerup', handlePointerUp, EVENT_PASSIVE_PARAMS);
      hasWindowBinding.current = true;
    }

    return (): void => {
      if (hasWindowBinding.current) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        hasWindowBinding.current = false;
      }
    };
  }, [handlePointerMove, handlePointerUp, isDragging]);

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

  // Use custom handle if requested.
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const rootStyle: CSSProperties = {
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

  const appliedTransition = canTransition ? transition : undefined;

  return (
    <div {...props} ref={rootContainerRef} style={rootStyle} data-rcs="root">
      {itemTwo}
      <ContainerClip ref={clipContainerRef} transition={appliedTransition}>
        {itemOne}
      </ContainerClip>
      <ContainerHandle
        portrait={portrait}
        ref={handleContainerRef}
        transition={appliedTransition}
      >
        {Handle}
      </ContainerHandle>
    </div>
  );
};
