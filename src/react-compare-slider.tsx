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
  /** Orientation */
  portrait?: boolean;
  /** Divider position in pixels */
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
    // Only want inner handle to be selectable
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
  /** Optional inline styles */
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

/** Container for items passed to main component */
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
export interface ReactCompareSliderProps {
  /** Custom handle component */
  handle?: React.ReactNode;
  /** First item to show */
  itemOne: React.ReactNode;
  /** Second item to show */
  itemTwo: React.ReactNode;
  /** Callback on position change */
  onPositionChange?: (position: ReactCompareSliderPropPosition) => void;
  /** Orientation */
  portrait?: ReactCompareSliderCommonProps['portrait'];
  /** Percentage position of divide (`0-100`) */
  position?: ReactCompareSliderPropPosition;
}

/** Properties for internal `updateInternalPosition` callback. */
interface UpdateInternalPositionProps {
  /** X coordinate to update to (landscape) */
  x: number;
  /** Y coordinate to update to (portrait) */
  y: number;
  /** Whether to calculate using page X and Y offsets (required for pointer events) */
  isOffset?: boolean;
}

/** Root Comparison slider. */
export const ReactCompareSlider: React.FC<ReactCompareSliderProps &
  React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  handle,
  itemOne,
  itemTwo,
  onPositionChange,
  portrait,
  position = 50,
  style,
  ...props
}): React.ReactElement => {
  /** Reference to root container. */
  const containerRef = useRef<HTMLDivElement>(null);
  /** Previous props positon (tracks user-supplied `position`). */
  const prevPropsPosition = usePrevious(position);
  /** Previous props positon (tracks user-supplied `portrait`). */
  const prevPropsPortrait = usePrevious(portrait);
  /** Reference to current position as a percentage value. */
  const internalPositionPc = useRef(position);
  /** Internal position in pixels. */
  const [internalPositionPx, setInternalPositionPx] = useState(0);
  /** Reference to previous `internalPositionPx` value. */
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
  /** Whether component has a `window` event binding. */
  const hasWindowBinding = useRef(false);

  /** Update internal px and pc */
  const updateInternalPosition = useCallback(
    ({ x, y, isOffset }: UpdateInternalPositionProps) => {
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
      let positionPx = portrait
        ? isOffset
          ? y - top - window.pageYOffset
          : y
        : isOffset
        ? x - left - window.pageXOffset
        : x;

      // Snap `positionPx` to container extremity if it exceeds container bounds.
      if (positionPx < 0) {
        positionPx = 0;
      } else if (portrait && positionPx > height) {
        positionPx = height;
      } else if (!portrait && positionPx > width) {
        positionPx = width;
      }

      // Calculate percentage with bounds checking.
      internalPositionPc.current = Math.min(
        Math.max((positionPx / (portrait ? height : width)) * 100, 0),
        100
      );

      setInternalPositionPx(positionPx);
      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [onPositionChange, portrait]
  );

  // Update internal position if `position` prop changes
  useEffect(() => {
    // Early out if position hasn't changed
    if (prevPropsPosition === position || prevPropsPosition === portrait) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { width, height } = containerRef.current!.getBoundingClientRect();

    // Parse `portrait` changes before `position` ones.
    if (prevPropsPortrait !== portrait) {
      // Update using internal percentage when `portrait` changes.
      updateInternalPosition({
        x: (width / 100) * internalPositionPc.current,
        y: (height / 100) * internalPositionPc.current,
      });
      return;
    }

    updateInternalPosition({
      x: (width / 100) * position,
      y: (height / 100) * position,
    });
  }, [
    portrait,
    position,
    prevPropsPortrait,
    prevPropsPosition,
    updateInternalPosition,
  ]);

  /** Handle mouse/touch down */
  const handlePointerDown = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();

      updateInternalPosition({
        isOffset: true,
        x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
        y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
      });

      setIsDragging(true);
    },
    [updateInternalPosition]
  );

  /** Handle mouse/touch move */
  const handlePointerMove = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      requestAnimationFrame((): void => {
        updateInternalPosition({
          isOffset: true,
          x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
          y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
        });
      });
    },
    [isDragging, updateInternalPosition]
  );

  /** Handle mouse/touch up */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /** Resync internal position on resize */
  const handleResize = useCallback(
    ({ width, height }: UseResizeObserverHandlerParams) => {
      updateInternalPosition({
        x: (width / 100) * internalPositionPc.current,
        y: (height / 100) * internalPositionPc.current,
      });
    },
    [updateInternalPosition]
  );

  // Allow drag outside of container while pointer is still down
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
        hasWindowBinding.current = false;
      }
    };
  }, [handlePointerMove, handlePointerUp, isDragging]);

  // Bind resize observer to container
  useResizeObserver(containerRef, handleResize);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEventListener('mousedown', handlePointerDown, containerRef.current!, {
    capture: true,
    passive: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEventListener('touchmove', handlePointerMove, containerRef.current!, {
    capture: false,
    passive: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEventListener('touchend', handlePointerUp, containerRef.current!, {
    capture: false,
    passive: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEventListener('touchstart', handlePointerDown, containerRef.current!, {
    capture: true,
    passive: false,
  });

  // Use custom handle if requested
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
    touchAction: portrait ? 'pan-x' : 'pan-y',
    userSelect: 'none',
    KhtmlUserSelect: 'none',
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
