import React, { useEffect, useRef, useState } from 'react';

export const CLIENT_SUPPORTS_CSS_CLIP_PATH =
  typeof CSS !== 'undefined' &&
  CSS.supports &&
  CSS.supports('clip-path', 'inset(0 0 0 0)');

/**
 * Permitted props for `styleFitContainer`
 */
interface StyleFitContainerProps {
  objectFit?: React.CSSProperties['objectFit'];
}

/**
 * Style CSS util to fit container
 */
export const styleFitContainer = ({
  objectFit = 'cover',
}: StyleFitContainerProps = {}): Partial<React.CSSProperties> => ({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  userSelect: 'none',
  msUserSelect: 'none',
  objectFit,
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
    pointerEvents: 'none',
    transform: portrait
      ? `translateY(${position}%)`
      : `translateX(${position}%)`,
  };

  return <div style={style}>{children}</div>;
};

/**
 * Overridable handle
 */
export const ReactCompareSliderHandle: React.FC<
  Pick<ReactCompareSliderCommonProps, 'portrait'>
> = ({ portrait, ...props }): React.ReactElement => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    height: portrait ? 3 : '100%',
    width: portrait ? '100%' : 3,
    transform: portrait ? 'translateY(-50%)' : 'translateX(-50%)',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 .2rem #000000',
    cursor: portrait ? 'ns-resize' : 'ew-resize',
    pointerEvents: 'all',
  };

  return <div {...props} style={style} />;
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
  };

  // Use `clip` if `clip-path` is not supported
  if (!CLIENT_SUPPORTS_CSS_CLIP_PATH) {
    style.clip = portrait
      ? `rect(auto,auto,${positionPx}px,auto)`
      : `rect(auto,${positionPx}px,auto,auto)`;
  }

  return <div {...props} style={style} />;
};

export interface ReactCompareSliderProps {
  /** Handle component for dragging between comparisons */
  handle?: React.ReactNode;
  /** First item to show */
  itemOne: React.ReactNode;
  /** Second item to show */
  itemTwo: React.ReactNode;
  /** Orientation */
  portrait?: boolean;
  /** Percentage position of divide */
  position?: ReactCompareSliderPropPosition;
}

interface ReactCompareSliderStatePositions {
  /** Position percentage */
  position: number;
  /** Position in px for legacy browsers */
  positionPx: number;
}

/**
 * Root component
 */
export const ReactCompareSlider: React.FC<ReactCompareSliderProps> = ({
  handle,
  itemOne,
  itemTwo,
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

  // Set initial position for legacy browsers
  useEffect((): void => {
    if (!CLIENT_SUPPORTS_CSS_CLIP_PATH) {
      setPositions(positions => {
        const { width, height } = containerRef.current.getBoundingClientRect();

        return {
          ...positions,
          positionPx: portrait
            ? (height * position) / 100
            : (width * position) / 100,
        };
      });
    }
  }, []);

  // Update internal position if position prop changes
  useEffect((): void => {
    setPositions(positions => ({ ...positions, position }));
  }, [position]);

  // Bind and handle events
  useEffect((): (() => void) => {
    const updatePosition = (x: number, y: number): void => {
      const { width, height } = containerRef.current.getBoundingClientRect();

      setPositions(positions => ({
        ...positions,
        positionPx: portrait ? y : x,
        position: portrait ? (y / height) * 100 : (x / width) * 100,
      }));
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
    containerRef.current.addEventListener('mousedown', handleMouseDown, {
      capture: false,
      passive: true,
    });

    containerRef.current.addEventListener('mouseleave', handleFinish, {
      capture: false,
      passive: true,
    });

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    containerRef.current.addEventListener('mouseup', handleFinish, {
      capture: false,
      passive: true,
    });

    // Touch event bindings
    containerRef.current.addEventListener('touchstart', handleTouchStart, {
      capture: false,
      passive: true,
    });

    containerRef.current.addEventListener('touchend', handleFinish, {
      capture: false,
      passive: true,
    });

    containerRef.current.addEventListener('touchmove', handleTouchMove);

    containerRef.current.addEventListener('touchcancel', handleFinish, {
      capture: false,
      passive: true,
    });

    return (): void => {
      // Mouse event bindings
      containerRef.current.removeEventListener('mousedown', handleMouseDown);
      containerRef.current.removeEventListener('mouseleave', handleFinish);
      containerRef.current.removeEventListener('mousemove', handleMouseMove);
      containerRef.current.removeEventListener('mouseup', handleFinish);

      // Touch events bindings
      containerRef.current.removeEventListener('touchstart', handleTouchStart);
      containerRef.current.removeEventListener('touchend', handleFinish);
      containerRef.current.removeEventListener('touchmove', handleTouchMove);
      containerRef.current.removeEventListener('touchcancel', handleFinish);
    };
  }, [isDragging]);

  // Use custom handle if requested
  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const style: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
  };

  return (
    <div {...props} ref={containerRef} style={style}>
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
