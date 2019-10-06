import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResizeObserver } from 'resize-observer';

/**
 * CSS style util for child to fit container
 */
export const styleFitContainer = ({
  objectFit = 'cover',
  ...props
}: React.CSSProperties = {}): Partial<React.CSSProperties> => ({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  objectFit,
  ...props,
});

type ReactCompareSliderPropPosition = number;

/**
 * Common props shared between child components
 */
interface ReactCompareSliderCommonProps {
  portrait?: boolean;
  position: ReactCompareSliderPropPosition;
}

/**
 * Handle container to control position
 */
const ReactCompareSliderHandleContainer: React.FC<
  ReactCompareSliderCommonProps
> = ({ children, position, portrait }): React.ReactElement => {
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

/**
 * Overridable handle
 */
export const ReactCompareSliderHandle: React.FC<
  Pick<ReactCompareSliderCommonProps, 'portrait'>
> = ({ portrait, ...props }): React.ReactElement => {
  const style: React.CSSProperties = {
    height: portrait ? 3 : '100%',
    width: portrait ? '100%' : 3,
    backgroundColor: '#ffffff',
    boxShadow: '0 0 .2rem #000000',
    cursor: portrait ? 'ns-resize' : 'ew-resize',
  };

  return <div {...props} style={style} data-rcs="main-handle-inner" />;
};

/**
 * Container for items passed to main component
 */
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

/**
 * Props for main component
 */
export interface ReactCompareSliderProps {
  /** Handle component for dragging between comparisons */
  handle?: React.ReactNode;
  /** First item to show */
  itemOne: React.ReactNode;
  /** Second item to show */
  itemTwo: React.ReactNode;
  /** Callback on position change */
  onChange?: (position: ReactCompareSliderPropPosition) => void;
  /** Orientation */
  portrait?: boolean;
  /** Percentage position of divide */
  position?: ReactCompareSliderPropPosition;
}

/**
 * Props for `updateInternalPosition` util
 */
interface UpdateInternalPositionProps {
  /** Percentage to calculate position from */
  percentage?: number;
  /** Pointer X to calculate position from (landscape mode) */
  pointerX?: number;
  /** Pointer Y to calculate position from (portrait mode) */
  pointerY?: number;
}

/**
 * Root component
 */
export const ReactCompareSlider: React.FC<
  ReactCompareSliderProps & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({
  handle,
  itemOne,
  itemTwo,
  onChange,
  portrait,
  position = 50,
  ...props
}): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [isDragging, setIsDragging] = useState(false);
  // const [containerDimensions, setContainerDimensions] = useState({
  //   width: 0,
  //   height: 0,
  // });
  const [internalPosition, setInternalPosition] = useState({
    pc: position,
    px: 0,
  });

  /**
   * Update internal position state from `x` and `y` coordinate *or* a
   * `percentage` value
   */
  const updateInternalPosition = useCallback(
    ({ percentage, pointerX, pointerY }: UpdateInternalPositionProps): void => {
      const {
        top,
        left,
        width,
        height,
      } = containerRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      // Use pointer positions if defined
      if (pointerX && pointerY) {
        x = pointerX - left - window.scrollX;
        y = pointerY - top - window.scrollY;
        // Use percentage if defined
      } else if (percentage) {
        x = (width / 100) * percentage;
        y = (height / 100) * percentage;
      }

      const px = portrait ? y : x;
      const pc = portrait ? (y / height) * 100 : (x / width) * 100;

      setInternalPosition({ pc, px });

      if (onChange) {
        onChange(pc);
      }
    },

    [onChange, portrait]
  );

  // Update internal position if position prop changes
  useEffect((): void => {
    updateInternalPosition({ percentage: position });
  }, [position, updateInternalPosition]);

  /**
   * Handle element resize event
   */
  const handleResize = useCallback(() => {
    const { width, height } = containerRef.current.getBoundingClientRect();
    setInternalPosition(state => {
      return {
        ...state,
        px: portrait ? (height / 100) * state.pc : (width / 100) * state.pc,
      };
    });
  }, [portrait]);

  // Update internal position on resize
  useEffect(() => {
    const ro = new ResizeObserver((): void => {
      handleResize();
    });

    // Bind observer
    const el = containerRef.current;
    ro.observe(el);

    return (): void => ro.unobserve(el);
  }, [handleResize]);

  // Bind and handle events
  useEffect((): (() => void) => {
    const containerRefCurrent = containerRef.current;

    const handleMouseDown = (ev: MouseEvent): void => {
      ev.preventDefault();
      if (!isDragging) setIsDragging(true);
      updateInternalPosition({ pointerX: ev.pageX, pointerY: ev.pageY });
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      if (isDragging) {
        requestAnimationFrame((): void => {
          updateInternalPosition({ pointerX: ev.pageX, pointerY: ev.pageY });
        });
      }
    };

    const handleTouchStart = (ev: TouchEvent): void => {
      ev.preventDefault();
      if (!isDragging) setIsDragging(true);
      updateInternalPosition({
        pointerX: ev.touches[0].pageX,
        pointerY: ev.touches[0].pageY,
      });
    };

    const handleTouchMove = (ev: TouchEvent): void => {
      if (isDragging) {
        requestAnimationFrame((): void => {
          updateInternalPosition({
            pointerX: ev.touches[0].pageX,
            pointerY: ev.touches[0].pageY,
          });
        });
      }
    };

    const handleFinish = (): void => {
      if (isDragging) setIsDragging(false);
    };

    // Mouse event bindings
    containerRefCurrent.addEventListener('mousedown', handleMouseDown, {
      capture: false,
      passive: false,
    });

    containerRefCurrent.addEventListener('mouseleave', handleFinish, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('mousemove', handleMouseMove, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('mouseup', handleFinish, {
      capture: false,
      passive: true,
    });

    // Touch event bindings
    containerRefCurrent.addEventListener('touchstart', handleTouchStart, {
      capture: false,
      passive: false,
    });

    containerRefCurrent.addEventListener('touchend', handleFinish, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('touchmove', handleTouchMove, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('touchcancel', handleFinish, {
      capture: false,
      passive: true,
    });

    return (): void => {
      // Mouse event bindings
      containerRefCurrent.removeEventListener('mousedown', handleMouseDown);
      containerRefCurrent.removeEventListener('mouseleave', handleFinish);
      containerRefCurrent.removeEventListener('mousemove', handleMouseMove);
      containerRefCurrent.removeEventListener('mouseup', handleFinish);

      // Touch events bindings
      containerRefCurrent.removeEventListener('touchstart', handleTouchStart);
      containerRefCurrent.removeEventListener('touchend', handleFinish);
      containerRefCurrent.removeEventListener('touchmove', handleTouchMove);
      containerRefCurrent.removeEventListener('touchcancel', handleFinish);
    };
  }, [isDragging, portrait, updateInternalPosition]);

  // Use custom handle if requested
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const style: React.CSSProperties = {
    // @NOTE using `flex` to ensure Firefox will calculate the correct width
    //       of bounding box, it will return `0` otherwise
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
    userSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return (
    <div {...props} ref={containerRef} style={style} data-rcs="root">
      {itemTwo}
      <ReactCompareSliderItem
        position={internalPosition.px}
        portrait={portrait}
      >
        {itemOne}
      </ReactCompareSliderItem>
      <ReactCompareSliderHandleContainer
        position={internalPosition.px}
        portrait={portrait}
      >
        {Handle}
      </ReactCompareSliderHandleContainer>
    </div>
  );
};
