import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC, ReactElement } from 'react';

import { ContainerClip, ContainerHandle } from './Container';
import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import type { ReactCompareSliderDetailedProps } from './types';
import type { UseResizeObserverHandlerProps } from './utils';
import { getPositionAsPercentage } from './utils';
import { KeyboardEventKeys, useEventListener, usePrevious, useResizeObserver } from './utils';

/** Properties for internal `updateInternalPosition` callback. */
interface UpdateInternalPositionProps
  extends Required<Pick<ReactCompareSliderDetailedProps, 'boundsPadding' | 'portrait'>> {
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
  keyboardIncrement = 20,
  style,
  ...props
}): ReactElement => {
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
  const [didMount, setDidMount] = useState(false);

  // Set mount state to ensure initial position setter is not skipped.
  useEffect(() => {
    setDidMount(true);
  }, []);

  // Set target container for pointer events.
  useEffect(() => {
    setInteractiveTarget(
      onlyHandleDraggable ? handleContainerRef.current : rootContainerRef.current,
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
      const { left, top, width, height } = (
        rootContainerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      // Early out if width or height are zero, can't calculate values from zeros.
      if (width === 0 || height === 0) return;

      /** Width or height with CSS scaling accounted for. */
      const zoomScale = _portrait
        ? height / ((rootContainerRef.current as HTMLDivElement).offsetHeight || 1)
        : width / ((rootContainerRef.current as HTMLDivElement).offsetWidth || 1);

      // Convert passed pixel to percentage using the container's bounds.
      const boundsPaddingPercentage =
        ((_boundsPadding * zoomScale) / (_portrait ? height : width)) * 100;

      const nextPosition = getPositionAsPercentage({
        bounds: { x, y, width, height, left, top },
        isOffset,
        portrait: _portrait,
      });

      /** Next position clamped within padded `boundsPadding` box. */
      const nextPositionWithBoundsPadding = Math.min(
        Math.max(nextPosition, boundsPaddingPercentage * zoomScale),
        100 - boundsPaddingPercentage * zoomScale,
      );

      const canSkipUpdate =
        didMount &&
        nextPosition === internalPositionPc.current &&
        (nextPosition === 100 || nextPosition === 0) &&
        (internalPositionPc.current === 0 || internalPositionPc.current === 100);

      // Early out if pixel and percentage positions are already at the min/max to prevent update
      // spamming when the user is sliding outside of the container.
      if (canSkipUpdate) {
        return;
      }

      // Set new internal position.
      internalPositionPc.current = nextPosition;

      (handleContainerRef.current as HTMLButtonElement).setAttribute(
        'aria-valuenow',
        `${Math.round(internalPositionPc.current)}`,
      );

      (handleContainerRef.current as HTMLElement).style.top = _portrait
        ? `${nextPositionWithBoundsPadding}%`
        : '0';

      (handleContainerRef.current as HTMLElement).style.left = _portrait
        ? '0'
        : `${nextPositionWithBoundsPadding}%`;

      (clipContainerRef.current as HTMLElement).style.clipPath = _portrait
        ? `inset(${nextPositionWithBoundsPadding}% 0 0 0)`
        : `inset(0 0 0 ${nextPositionWithBoundsPadding}%)`;

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [didMount, onPositionChange],
  );

  // Update internal position when other user controllable props change.
  useEffect(() => {
    const { width, height } = (rootContainerRef.current as HTMLDivElement).getBoundingClientRect();

    // Use current internal position if `position` hasn't changed.
    const nextPosition = position === prevPropPosition ? internalPositionPc.current : position;

    updateInternalPosition({
      portrait,
      boundsPadding,
      x: (width / 100) * nextPosition,
      y: (height / 100) * nextPosition,
    });
  }, [portrait, position, prevPropPosition, boundsPadding, updateInternalPosition]);

  /** Handle mouse/touch down. */
  const handlePointerDown = useCallback(
    (ev: PointerEvent) => {
      ev.preventDefault();

      // Only handle left mouse button (touch events also use 0).
      if (ev.button !== 0) return;

      updateInternalPosition({
        portrait,
        boundsPadding,
        isOffset: true,
        x: ev.pageX,
        y: ev.pageY,
      });

      setIsDragging(true);
    },
    [portrait, boundsPadding, updateInternalPosition],
  );

  /** Handle mouse/touch move. */
  const handlePointerMove = useCallback(
    function moveCall(ev: PointerEvent) {
      updateInternalPosition({
        portrait,
        boundsPadding,
        isOffset: true,
        x: ev.pageX,
        y: ev.pageY,
      });
    },
    [portrait, boundsPadding, updateInternalPosition],
  );

  /** Handle mouse/touch up. */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /** Resync internal position on resize. */
  const handleResize: (resizeProps: UseResizeObserverHandlerProps) => void = useCallback(
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
    [portrait, boundsPadding, updateInternalPosition],
  );

  /**
   * Yo dawg, we heard you like handles, so we handled in your handle so you can handle
   * while you handle.
   */
  const handleHandleClick = useCallback((ev: PointerEvent) => {
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

      const offsetX = isIncrement ? right - keyboardIncrement : left + keyboardIncrement;
      const offsetY = isIncrement ? top + keyboardIncrement : bottom - keyboardIncrement;

      updateInternalPosition({
        portrait,
        boundsPadding,
        x: portrait ? left : offsetX,
        y: portrait ? offsetY : top,
        isOffset: true,
      });
    },
    [boundsPadding, keyboardIncrement, portrait, updateInternalPosition],
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

  // Bind resize observer to container.
  useResizeObserver(rootContainerRef, handleResize);

  // Handle hover events on the container.
  useEffect(() => {
    const containerRef = rootContainerRef.current as HTMLDivElement;

    const handlePointerLeave = (): void => {
      if (isDragging) return;
      handlePointerUp();
    };

    if (changePositionOnHover) {
      containerRef.addEventListener('pointermove', handlePointerMove, EVENT_PASSIVE_PARAMS);
      containerRef.addEventListener('pointerleave', handlePointerLeave, EVENT_PASSIVE_PARAMS);
    }

    return () => {
      containerRef.removeEventListener('pointermove', handlePointerMove);
      containerRef.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [changePositionOnHover, handlePointerMove, handlePointerUp, isDragging]);

  useEventListener(
    'keydown',
    handleKeydown,
    handleContainerRef.current as HTMLButtonElement,
    EVENT_CAPTURE_PARAMS,
  );

  useEventListener(
    'click',
    handleHandleClick,
    handleContainerRef.current as HTMLButtonElement,
    EVENT_CAPTURE_PARAMS,
  );

  useEventListener(
    'pointerdown',
    handlePointerDown,
    interactiveTarget as HTMLDivElement,
    EVENT_CAPTURE_PARAMS,
  );

  // Use custom handle if requested.
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const rootStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
    touchAction: 'none',
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
