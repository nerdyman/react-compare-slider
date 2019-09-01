import React, { useEffect, useRef, useState } from 'react';

export const CLIENT_SUPPORTS_CSS_CLIP_PATH =
  typeof CSS !== 'undefined' &&
  CSS.supports &&
  CSS.supports('clip-path', 'inset(0 0 0 0)');

interface StyleFitContainerProps {
  objectFit?: React.CSSProperties['objectFit'];
}

/**
 * Style object util to fit container
 */
export const styleFitContainer = ({
  objectFit = 'cover',
}: StyleFitContainerProps = {}): Partial<React.CSSProperties> => ({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  userSelect: 'none',
  objectFit,
});

type ReactCompareSliderPropPosition = number;

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
    width: portrait ? '100%' : 'auto',
    height: portrait ? 'auto' : '100%',
    transform: portrait
      ? `translateY(${position}px)`
      : `translateX(${position}px)`,
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
    cursor: 'ew-resize',
  };

  return <div {...props} style={style} />;
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
    clipPath: `inset(0 0 ${portrait ? `${position}px 0` : `0 ${position}px`})`,
  };

  // Use `clip` if `clip-path` is not supported
  if (!CLIENT_SUPPORTS_CSS_CLIP_PATH) {
    style.clip = `rect(auto,${position}px,auto,auto)`;
  }

  return <div {...props} style={style} />;
};

export interface ReactCompareSliderProps {
  /** Handle component for dragging between comparisons */
  handle?: React.ReactNode;
  /** First item to show */
  itemFirst: React.ReactNode;
  /** Second item to show */
  itemSecond: React.ReactNode;
  /** Orientation */
  portrait?: boolean;
  /** Position of divide */
  position?: ReactCompareSliderPropPosition;
}

/**
 * Root component
 */
export const ReactCompareSlider: React.FC<ReactCompareSliderProps> = ({
  handle,
  itemFirst,
  itemSecond,
  portrait,
  position = window.innerWidth / 2,
  ...props
}): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [isDragging, setIsDragging] = useState(false);
  const [internalPosition, setInternalPosition] = useState(position);

  // Update internal position if position prop changes
  useEffect((): void => {
    setInternalPosition(position);
  }, [position]);

  useEffect((): (() => void) => {
    const updatePosition = (position: number): void => {
      setInternalPosition(
        position +
          (portrait
            ? containerRef.current.clientTop
            : containerRef.current.clientLeft)
      );
    };

    const handleMouseDown = (ev: MouseEvent): void => {
      if (!isDragging) setIsDragging(true);
      updatePosition(ev.clientX);
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      ev.preventDefault();
      if (isDragging) {
        requestAnimationFrame((): void => {
          updatePosition(ev.clientX);
        });
      }
    };

    const handleTouchStart = (ev: TouchEvent): void => {
      if (!isDragging) setIsDragging(true);
      updatePosition(ev.touches[0].clientX);
    };

    const handleTouchMove = (ev: TouchEvent): void => {
      ev.preventDefault();
      if (isDragging) {
        requestAnimationFrame((): void => {
          updatePosition(ev.touches[0].clientX);
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

  const Handle = handle || <ReactCompareSliderHandle portrait={portrait} />;

  const style: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: isDragging ? 'ew-resize' : undefined,
  };

  return (
    <div {...props} ref={containerRef} style={style}>
      {itemFirst}
      <ReactCompareSliderItem position={internalPosition} portrait={portrait}>
        {itemSecond}
      </ReactCompareSliderItem>
      <ReactCompareSliderHandleContainer
        position={internalPosition}
        portrait={portrait}
      >
        {Handle}
      </ReactCompareSliderHandleContainer>
    </div>
  );
};
