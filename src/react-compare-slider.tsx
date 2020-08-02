import React, { useEffect, useCallback, useRef, useState } from 'react';

import {
  useEventListener,
  usePrevious,
  UseResizeObserverHandlerParams,
  useResizeObserver,
} from './utils';

/** Slider position property. */
type ReactCompareSliderPropPosition = number;

/** Common props shared between child components. */
interface ReactCompareSliderCommonProps {
  /** Orientation. */
  portrait?: boolean;
  /** Divider position. */
  position: ReactCompareSliderPropPosition;
}

/** Handle container to control position. */
const ReactCompareSliderHandleContainer: React.FC<ReactCompareSliderCommonProps> = ({
  children,
  position,
  portrait,
}): React.ReactElement => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    transform: portrait
      ? `translateY(${position}px)`
      : `translateX(${position}px)`,
    // Only want inner handle to be selectable.
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
    <div style={style} data-rcs="main-handle-container">
      <div style={innerStyle}>{children}</div>
    </div>
  );
};

/** Props for `ReactCompareSliderHandle`. */
export interface ReactCompareSliderHandleProps
  extends Pick<ReactCompareSliderCommonProps, 'portrait'> {
  /** Optional inline styles. */
  style?: React.CSSProperties;
}

/** Overridable handle. */
export const ReactCompareSliderHandle: React.FC<ReactCompareSliderHandleProps> = ({
  portrait,
  style,
  ...props
}): React.ReactElement => {
  const rootStyle: React.CSSProperties = {
    height: portrait ? 3 : '100%',
    width: portrait ? '100%' : 3,
    backgroundColor: '#fff',
    boxShadow: '0 0 .2rem #000',
    cursor: portrait ? 'ns-resize' : 'ew-resize',
    ...style,
  };

  return <div {...props} style={rootStyle} data-rcs="main-handle-inner" />;
};

/** Container for items passed to main component. */
const ReactCompareSliderItem: React.FC<ReactCompareSliderCommonProps> = ({
  portrait,
  position,
  ...props
}): React.ReactElement => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clip: portrait
      ? `rect(auto,auto,${position}px,auto)`
      : `rect(auto,${position}px,auto,auto)`,
    willChange: 'clip',
    userSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return <div {...props} style={style} data-rcs="clip-item" />;
};

/** Comparison slider properties. */
export interface ReactCompareSliderProps
  extends Omit<ReactCompareSliderCommonProps, 'position'> {
  /** Padding to limit handle bounds in pixels on the X (landscape) or Y (portrait) axis. */
  boundsPadding?: number;
  /** Custom handle component. */
  handle?: React.ReactNode;
  /** First item to show. */
  itemOne: React.ReactNode;
  /** Second item to show. */
  itemTwo: React.ReactNode;
  /** Custom divider position. */
  position?: ReactCompareSliderCommonProps['position'];
  /** Callback on position change. */
  onPositionChange?: (position: ReactCompareSliderPropPosition) => void;
}

/** Properties for internal `updateInternalPosition` callback. */
interface UpdateInternalPositionProps
  extends Required<
    Pick<ReactCompareSliderProps, 'boundsPadding' | 'portrait'>
  > {
  /** X coordinate to update to (landscape). */
  x: number;
  /** Y coordinate to update to (portrait). */
  y: number;
  /** Whether to calculate using page X and Y offsets (required for pointer events). */
  isOffset?: boolean;
}

/** Root Comparison slider. */
export const ReactCompareSlider: React.FC<
  ReactCompareSliderProps & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({
  handle,
  itemOne,
  itemTwo,
  onPositionChange,
  portrait = false,
  position = 50,
  boundsPadding = 0,
  style,
  ...props
}): React.ReactElement => {
  /** Reference to root container. */
  const containerRef = useRef<HTMLDivElement>(null);
  /** Reference to current position as a percentage value. */
  const internalPositionPc = useRef(position);
  /** Previous `position` prop value. */
  const prevPropPosition = usePrevious(position);
  /** Internal position in pixels. */
  const [internalPositionPx, setInternalPositionPx] = useState(0);
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
  /** Whether component has a `window` event binding. */
  const hasWindowBinding = useRef(false);

  /** Update internal px and pc */
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
      } = containerRef.current!.getBoundingClientRect();

      // Early out if width or height are zero, can't calculate values
      // from zeros.
      if (width === 0 || height === 0) return;

      /** Position in pixels with offsets *optionally* applied. */
      let positionPx = _portrait
        ? isOffset
          ? y - top - window.pageYOffset
          : y
        : isOffset
        ? x - left - window.pageXOffset
        : x;

      // Snap `positionPx` to container extremity if it exceeds container bounds.
      if (positionPx < 0) {
        positionPx = 0;
      } else if (_portrait && positionPx > height) {
        positionPx = height;
      } else if (!_portrait && positionPx > width) {
        positionPx = width;
      }

      // Update internal position percentage *without* bounds - we always want
      // to return 0-100.
      internalPositionPc.current =
        (positionPx / (_portrait ? height : width)) * 100;

      // Update internal pixel position capped to min/max bounds.
      setInternalPositionPx(
        Math.min(
          // Get largest from pixel position *or* bounds padding
          Math.max(positionPx, 0 + _boundsPadding),
          // Use height *or* width based on orientation.
          (_portrait ? height : width) - _boundsPadding
        )
      );

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [onPositionChange]
  );

  // Update internal position if `position` prop changes.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { width, height } = containerRef.current!.getBoundingClientRect();

    // Use current internal position if `position` hasn't changed.
    const nextPosition =
      position === prevPropPosition ? internalPositionPc.current : position;

    updateInternalPosition({
      portrait,
      boundsPadding,
      x: (width / 100) * nextPosition,
      y: (height / 100) * nextPosition,
    });
  }, [
    portrait,
    position,
    prevPropPosition,
    boundsPadding,
    updateInternalPosition,
  ]);

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
      window.addEventListener('mousemove', handlePointerMove, {
        passive: true,
      });

      window.addEventListener('mouseup', handlePointerUp, {
        passive: true,
      });

      window.addEventListener('touchmove', handlePointerMove, {
        passive: true,
      });

      window.addEventListener('touchend', handlePointerUp, {
        passive: true,
      });

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
  useResizeObserver(containerRef, handleResize);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEventListener('mousedown', handlePointerDown, containerRef.current!, {
    capture: true,
    passive: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEventListener('touchstart', handlePointerDown, containerRef.current!, {
    capture: true,
    passive: false,
  });

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
    <div {...props} ref={containerRef} style={rootStyle} data-rcs="root">
      {itemTwo}
      <ReactCompareSliderItem position={internalPositionPx} portrait={portrait}>
        {itemOne}
      </ReactCompareSliderItem>
      <ReactCompareSliderHandleContainer
        position={internalPositionPx}
        portrait={portrait}
      >
        {Handle}
      </ReactCompareSliderHandleContainer>
    </div>
  );
};
