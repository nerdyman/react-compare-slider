import React, { useEffect, useRef, useState } from 'react';

/**
 * Whether the client supports CSS `clip-path`
 */
export const CLIENT_SUPPORTS_CSS_CLIP_PATH: boolean =
  typeof CSS !== 'undefined' &&
  CSS.supports &&
  CSS.supports('clip-path', 'inset(0 0 0 0)');

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
      ? `translateY(${position}%)`
      : `translateX(${position}%)`,
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
    <div style={style} data-rcs-main-handle-container>
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

  return <div {...props} style={style} data-rcs-main-handle-inner />;
};

interface ReactCompareSliderItemProps extends ReactCompareSliderCommonProps {
  positionPx: number;
}

/**
 * Container for items passed to main component
 */
const ReactCompareSliderItem: React.FC<ReactCompareSliderItemProps> = ({
  positionPx,
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
    clipPath: portrait
      ? `inset(${position}% 0 0 0`
      : `inset(0 0 0 ${position}%`,
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  };

  // Use `clip` if `clip-path` is not supported
  if (!CLIENT_SUPPORTS_CSS_CLIP_PATH) {
    style.clip = portrait
      ? `rect(auto,auto,${positionPx}px,auto)`
      : `rect(auto,${positionPx}px,auto,auto)`;
  }

  return <div {...props} style={style} data-rcs-main-item />;
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
 * Internal state for positions
 */
interface ReactCompareSliderStatePositions {
  /** Position percentage */
  position: ReactCompareSliderPropPosition;
  /** Position in px for legacy browsers */
  positionPx: number;
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
  const [positions, setPositions] = useState<ReactCompareSliderStatePositions>({
    position,
    positionPx: 0,
  });

  // Set position for legacy browsers
  useEffect((): void => {
    if (!CLIENT_SUPPORTS_CSS_CLIP_PATH) {
      setPositions(
        (positions): ReactCompareSliderStatePositions => {
          const {
            width,
            height,
          } = containerRef.current.getBoundingClientRect();

          return {
            ...positions,
            positionPx: portrait
              ? (height * position) / 100
              : (width * position) / 100,
          };
        }
      );
    }
    // @NOTE Disabling exhaustive-deps, only want this to run on mount,
    //       subsequent position changes are handled in hook below
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update internal position if position prop changes
  useEffect((): void => {
    setPositions(
      (positions): ReactCompareSliderStatePositions => ({
        ...positions,
        position,
      })
    );
  }, [position]);

  // Bind and handle events
  useEffect((): (() => void) => {
    const containerRefCurrent = containerRef.current;

    const updatePosition = (x: number, y: number): void => {
      const {
        top,
        left,
        width,
        height,
      } = containerRefCurrent.getBoundingClientRect();

      const position = portrait
        ? ((y - top - window.scrollY) / height) * 100
        : ((x - left - window.scrollX) / width) * 100;

      setPositions(
        (positions): ReactCompareSliderStatePositions => ({
          ...positions,
          positionPx: portrait ? y : x,
          position,
        })
      );

      if (onChange) onChange(position);
    };

    const handleMouseDown = (ev: MouseEvent): void => {
      if (!isDragging) setIsDragging(true);
      updatePosition(ev.pageX, ev.pageY);
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      ev.preventDefault();
      if (isDragging) {
        requestAnimationFrame((): void => {
          updatePosition(ev.pageX, ev.pageY);
        });
      }
    };

    const handleTouchStart = (ev: TouchEvent): void => {
      if (!isDragging) setIsDragging(true);
      updatePosition(ev.touches[0].pageX, ev.touches[0].pageY);
    };

    const handleTouchMove = (ev: TouchEvent): void => {
      ev.preventDefault();
      if (isDragging) {
        requestAnimationFrame((): void => {
          updatePosition(ev.touches[0].pageX, ev.touches[0].pageY);
        });
      }
    };

    const handleFinish = (): void => {
      if (isDragging) setIsDragging(false);
    };

    // Mouse event bindings
    containerRefCurrent.addEventListener('mousedown', handleMouseDown, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('mouseleave', handleFinish, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('mousemove', handleMouseMove, {
      capture: false,
      passive: false,
    });

    containerRefCurrent.addEventListener('mouseup', handleFinish, {
      capture: false,
      passive: true,
    });

    // Touch event bindings
    containerRefCurrent.addEventListener('touchstart', handleTouchStart, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('touchend', handleFinish, {
      capture: false,
      passive: true,
    });

    containerRefCurrent.addEventListener('touchmove', handleTouchMove, {
      capture: true,
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
  }, [isDragging, onChange, portrait]);

  // Use custom handle if requested
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const style: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return (
    <div {...props} ref={containerRef} style={style} data-rcs-root>
      {itemOne}
      <ReactCompareSliderItem
        positionPx={positions.positionPx}
        position={positions.position}
        portrait={portrait}
      >
        {itemTwo}
      </ReactCompareSliderItem>
      <ReactCompareSliderHandleContainer
        position={positions.position}
        portrait={portrait}
      >
        {Handle}
      </ReactCompareSliderHandleContainer>
    </div>
  );
};
