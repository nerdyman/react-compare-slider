import React, { useEffect, useCallback, useRef, useState } from 'react';

import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import { ThisClipContainer, ThisHandleContainer } from './ThisContainers';
import { ReactCompareSliderCommonProps, ReactCompareSliderPropPosition } from './types';

import { useEventListener, usePrevious } from './utils';

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
  const [didSyncBounds, setDidSyncBounds] = useState(false);
  /** DOM node of the root element. */
  const rootContainerRef = useRef<HTMLDivElement>(null);
  /** DOM node of the container which clips the item. */
  const clipContainerRef = useRef<HTMLDivElement>(null);
  /** DOM node of the handle container. */
  const handleContainerRef = useRef<HTMLDivElement>(null);
  /** The current position as a percentage value. */
  const internalPositionPc = useRef(position);
  /** Previous `position` prop value. */
  const prevPropPosition = usePrevious(position);
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
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
      portrait: thisPortrait,
      boundsPadding: thisBoundsPadding,
    }: UpdateInternalPositionProps) {
      const {
        top,
        left,
        width,
        height,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = rootContainerRef.current!.getBoundingClientRect();

      // Early out if width or height are zero, can't calculate values from zeros.
      if (width === 0 || height === 0) return;

      /**
       * Clamped pixel position within the container's bounds.
       * @NOTE This does *not* take `boundsPadding` into account because we need the real
       *       coords to correctly position the handle.
       */
      const positionPx = Math.min(
        Math.max(
          // Determine bounds based on orientation
          thisPortrait
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
        thisPortrait ? height : width
      );

      /** Whether the current pixel position meets the min/max container bounds. */
      const positionMeetsBounds = thisPortrait
        ? positionPx === 0 || positionPx === height
        : positionPx === 0 || positionPx === width;

      const canSkipPositionPc =
        internalPositionPc.current === 0 || internalPositionPc.current === 100;

      // Early out if pixel and percentage positions are already at the min/max and the
      // bounds have been synced after mounting to prevent update spamming when the user
      // is sliding outside of the container.
      if (didSyncBounds && canSkipPositionPc && positionMeetsBounds) {
        return;
      }

      if (!didSyncBounds) setDidSyncBounds(true);

      /** Pixel position clamped to extremities *with* bounds padding. */
      const clampedPosition =
        (Math.min(
          // Get largest from pixel position *or* bounds padding.
          Math.max(positionPx, 0 + thisBoundsPadding),
          // Use height *or* width based on orientation.
          (thisPortrait ? height : width) - thisBoundsPadding
        ) /
          (thisPortrait ? height : width)) *
          100 +
        '%';

      // Set new internal position *without* bounds padding to provide accurate value in
      // callback.
      internalPositionPc.current = (positionPx / (thisPortrait ? height : width)) * 100;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clipContainerRef.current!.style.clipPath = thisPortrait
        ? `polygon(0 0, 100% 0, 100% ${clampedPosition}, 0 ${clampedPosition})`
        : `polygon(0 0, ${clampedPosition} 0, ${clampedPosition} 100%, 0% 100%)`;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      handleContainerRef.current!.style.transform = thisPortrait
        ? `translate3d(0,${clampedPosition},0)`
        : `translate3d(${clampedPosition},0,0)`;

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [didSyncBounds, onPositionChange]
  );

  // Update internal position when other user-controllable props change.
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
    (ev: PointerEvent) => {
      ev.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      handleContainerRef.current!.setPointerCapture(ev.pointerId);

      updateInternalPosition({
        portrait,
        boundsPadding,
        isOffset: true,
        x: ev.pageX,
        y: ev.pageY,
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
    [boundsPadding, isDragging, portrait, updateInternalPosition]
  );

  /** Handle mouse/touch up. */
  const handlePointerUp = useCallback((ev: PointerEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    handleContainerRef.current!.setPointerCapture(ev.pointerId);
    setIsDragging(false);
  }, []);

  useEventListener(
    'pointerdown',
    handlePointerDown,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    interactiveTarget!,
    EVENT_CAPTURE_PARAMS
  );

  useEventListener(
    'pointermove',
    handlePointerMove,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    interactiveTarget!,
    EVENT_PASSIVE_PARAMS
  );

  useEventListener(
    'pointerup',
    handlePointerUp,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    interactiveTarget!,
    EVENT_PASSIVE_PARAMS
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
