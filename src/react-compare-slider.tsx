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

/** Overridable handle. */
export const ReactCompareSliderHandle: React.FC<Pick<
  ReactCompareSliderCommonProps,
  'portrait'
>> = ({ portrait, ...props }): React.ReactElement => {
  const style: React.CSSProperties = {
    height: portrait ? 3 : '100%',
    width: portrait ? '100%' : 3,
    backgroundColor: '#ffffff',
    boxShadow: '0 0 .2rem #000000',
    cursor: portrait ? 'ns-resize' : 'ew-resize',
  };

  return <div {...props} style={style} data-rcs="main-handle-inner" />;
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

/** Comparison slider */
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
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const prevPropsPosition = usePrevious(position);
  const internalPositionPc = useRef(position);
  const [internalPositionPx, setInternalPositionPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasWindowBinding = useRef(false);

  const updateInternalPosition = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const {
        top,
        left,
        width,
        height,
      } = containerRef.current.getBoundingClientRect();

      const positionPx = portrait
        ? y - top - window.pageYOffset
        : x - left - window.pageXOffset;

      setInternalPositionPx(positionPx);

      // Calculate percentage with bounds checking
      internalPositionPc.current = Math.min(
        Math.max((positionPx / (portrait ? height : width)) * 100, 0),
        100
      );

      if (onPositionChange) onPositionChange(internalPositionPc.current);
    },
    [onPositionChange, portrait]
  );

  // Update internal position if `position` prop changes
  useEffect(() => {
    // Early out if position hasn't changed
    if (prevPropsPosition === position) return;

    const {
      top,
      left,
      width,
      height,
    } = containerRef.current.getBoundingClientRect();

    updateInternalPosition({
      x: (width / 100) * position + left,
      y: (height / 100) * position + top,
    });
    // `prevPropsPosition` is a ref value so it shouldn't been in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, updateInternalPosition]);

  const handlePointerDown = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();

      updateInternalPosition({
        x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
        y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
      });

      setIsDragging(true);
    },
    [updateInternalPosition]
  );

  const handlePointerMove = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      requestAnimationFrame((): void => {
        updateInternalPosition({
          x: ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX,
          y: ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY,
        });
      });
    },
    [isDragging, updateInternalPosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleResize = useCallback(
    ({ width, height }: UseResizeObserverHandlerParams) => {
      setInternalPositionPx(
        ((portrait ? height : width) / 100) * internalPositionPc.current
      );
    },
    [portrait]
  );

  // Allow drag outside of container while pointer is still down
  useEffect(() => {
    if (isDragging && !hasWindowBinding.current) {
      window.addEventListener('mousemove', handlePointerMove, {
        passive: true,
      });

      document.addEventListener('mouseup', handlePointerUp, {
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

  useEventListener('mousedown', handlePointerDown, containerRef.current, {
    capture: true,
    passive: false,
  });

  useEventListener('touchmove', handlePointerMove, containerRef.current, {
    capture: false,
    passive: true,
  });

  useEventListener('touchend', handlePointerUp, containerRef.current, {
    capture: false,
    passive: true,
  });

  useEventListener('touchstart', handlePointerDown, containerRef.current, {
    capture: true,
    passive: false,
  });

  // Use custom handle if requested
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
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
