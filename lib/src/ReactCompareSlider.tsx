import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import { ContainerHandle, ContainerItem } from './Container';
import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import { ReactCompareSliderCssVars } from './consts';
import {
  ReactCompareSliderClipOption,
  type ReactCompareSliderDetailedProps,
  type UseReactCompareSliderRefReturn,
} from './types';
import { KeyboardEventKeys, useEventListener, usePrevious } from './utils';

/** Properties for internal position setter callback. */
type SetPositionFromBoundsProps = {
  /** X coordinate to update to (landscape). */
  x: number;
  /** Y coordinate to update to (portrait). */
  y: number;
  /** Whether to calculate using page X and Y offsets (required for pointer events). */
  isOffset?: boolean;
};

const EVENT_PASSIVE_PARAMS = { capture: false, passive: true };
const EVENT_CAPTURE_PARAMS = { capture: true, passive: false };

/**
 * Handler for the `handle` container element.
 */
const handleContainerClick = (ev: PointerEvent): void => {
  ev.preventDefault();
  (ev.currentTarget as HTMLButtonElement).focus();
};

/** Root Comparison slider. */
export const ReactCompareSlider = forwardRef<UseReactCompareSliderRefReturn, ReactCompareSliderDetailedProps>(
  (
    {
      boundsPadding = 0,
      browsingContext = globalThis,
      changePositionOnHover = false,
      clip = ReactCompareSliderClipOption.both,
      disabled = false,
      handle,
      itemOne,
      itemTwo,
      keyboardIncrement = '5%',
      onlyHandleDraggable = false,
      onPositionChange,
      portrait = false,
      position = 50,
      style,
      transition,
      ...props
    },
    ref,
  ) => {
    /** DOM node of the root element. */
    const rootContainerRef = useRef<HTMLDivElement>(null);
    /** DOM node of the handle container. */
    const handleContainerRef = useRef<HTMLButtonElement>(null);
    /** Current position as a percentage value (initially negative to sync bounds on mount). */
    const internalPosition = useRef(position);
    /** Whether user is currently dragging. */
    const [isDragging, setIsDragging] = useState(false);
    /** Whether the `transition` property can be applied. */
    const [canTransition, setCanTransition] = useState(true);
    /** Whether component has a `window` event binding. */
    const hasBrowsingContextBinding = useRef(false);
    /** Target container for pointer events. */
    const [interactiveTarget, setInteractiveTarget] = useState<HTMLElement | null>();
    /** The `position` value at *previous* render. */
    const previousPosition = usePrevious(position);

    const setPosition = useCallback(
      (nextPosition: number) => {
        const appliedPosition = Math.min(Math.max(nextPosition, 0), 100);

        rootContainerRef.current?.style.setProperty(
          ReactCompareSliderCssVars.position,
          `clamp(var(${ReactCompareSliderCssVars.boundsPadding}), ${appliedPosition}% - var(${ReactCompareSliderCssVars.boundsPadding}) + var(${ReactCompareSliderCssVars.boundsPadding}), calc(100% - var(${ReactCompareSliderCssVars.boundsPadding})))`,
        );

        handleContainerRef.current?.setAttribute('aria-valuenow', `${Math.round(nextPosition)}`);
        internalPosition.current = appliedPosition;

        onPositionChange?.(nextPosition);
      },
      [onPositionChange],
    );

    /** Sync the internal position and trigger position change callback if defined. */
    const setPositionFromBounds = useCallback(
      function updateInternal({ x, y, isOffset }: SetPositionFromBoundsProps) {
        const rootElement = rootContainerRef.current as HTMLDivElement;
        const { width, height, left, top } = rootElement.getBoundingClientRect();

        // Early out when component has zero bounds.
        if (width === 0 || height === 0) return;

        const pixelPosition = portrait
          ? isOffset
            ? y - top - browsingContext.scrollY
            : y
          : isOffset
          ? x - left - browsingContext.scrollX
          : x;

        const nextPosition = (pixelPosition / (portrait ? height : width)) * 100;

        setPosition(nextPosition);
      },
      [browsingContext, portrait, setPosition],
    );

    // Update internal position on change.
    useEffect(() => {
      if (position !== previousPosition) {
        setPosition(position);
      }
    }, [position, previousPosition, setPosition]);

    // Update bounds padding on change.
    useEffect(() => {
      rootContainerRef.current?.style.setProperty(
        ReactCompareSliderCssVars.boundsPadding,
        `${boundsPadding}px`,
      );
    }, [boundsPadding]);

    /** Handle mouse/touch down. */
    const handlePointerDown = useCallback(
      (ev: PointerEvent) => {
        ev.preventDefault();

        // Only handle left mouse button (touch events also use 0).
        if (disabled || ev.button !== 0) return;

        setPositionFromBounds({ isOffset: false, x: ev.pageX, y: ev.pageY });
        setIsDragging(true);
        setCanTransition(true);
      },
      [disabled, setPositionFromBounds],
    );

    /** Handle mouse/touch move. */
    const handlePointerMove = useCallback(
      function moveCall(ev: PointerEvent) {
        setPositionFromBounds({ isOffset: false, x: ev.pageX, y: ev.pageY });
        setCanTransition(false);
      },
      [setPositionFromBounds],
    );

    /** Handle mouse/touch up. */
    const handlePointerUp = useCallback(() => {
      setIsDragging(false);
      setCanTransition(true);
    }, []);

    const handleTouchEnd = useCallback(() => {
      setIsDragging(false);
      setCanTransition(true);
    }, []);

    /** Handle keyboard movment. */
    const handleKeydown = useCallback(
      (ev: KeyboardEvent) => {
        if (!Object.values(KeyboardEventKeys).includes(ev.key as KeyboardEventKeys)) {
          return;
        }

        ev.preventDefault();
        setCanTransition(true);

        const { top, left } = (handleContainerRef.current as HTMLButtonElement).getBoundingClientRect();
        const { width, height } = (rootContainerRef.current as HTMLDivElement).getBoundingClientRect();

        const incrementPercentage =
          typeof keyboardIncrement === 'string'
            ? parseFloat(keyboardIncrement)
            : (keyboardIncrement / width) * 100;

        const isIncrement = portrait
          ? ev.key === KeyboardEventKeys.ARROW_LEFT || ev.key === KeyboardEventKeys.ARROW_DOWN
          : ev.key === KeyboardEventKeys.ARROW_RIGHT || ev.key === KeyboardEventKeys.ARROW_UP;

        const nextPosition = Math.min(
          Math.max(
            isIncrement
              ? internalPosition.current + incrementPercentage
              : internalPosition.current - incrementPercentage,
            0,
          ),
          100,
        );

        setPositionFromBounds({
          x: portrait ? left : (width * nextPosition) / 100,
          y: portrait ? (height * nextPosition) / 100 : top,
        });
      },
      [keyboardIncrement, portrait, setPositionFromBounds],
    );

    // Set target container for pointer events.
    useEffect(() => {
      setInteractiveTarget(onlyHandleDraggable ? handleContainerRef.current : rootContainerRef.current);
    }, [onlyHandleDraggable]);

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

    // Allow drag outside of container while pointer is still down.
    useEffect(() => {
      if (isDragging && !hasBrowsingContextBinding.current) {
        browsingContext.addEventListener('pointermove', handlePointerMove, EVENT_PASSIVE_PARAMS);
        browsingContext.addEventListener('pointerup', handlePointerUp, EVENT_PASSIVE_PARAMS);
        hasBrowsingContextBinding.current = true;
      }

      return (): void => {
        if (hasBrowsingContextBinding.current) {
          browsingContext.removeEventListener('pointermove', handlePointerMove);
          browsingContext.removeEventListener('pointerup', handlePointerUp);
          hasBrowsingContextBinding.current = false;
        }
      };
    }, [handlePointerMove, handlePointerUp, isDragging, browsingContext]);

    useImperativeHandle(
      ref,
      () => {
        return {
          rootContainer: rootContainerRef.current,
          handleContainer: handleContainerRef.current,
          setPosition(nextPosition): void {
            const { width, height } = (rootContainerRef.current as HTMLDivElement).getBoundingClientRect();

            setPositionFromBounds({
              x: (width / 100) * nextPosition,
              y: (height / 100) * nextPosition,
            });
          },
        };
      },
      [setPositionFromBounds],
    );

    useEventListener('touchend', handleTouchEnd, interactiveTarget, EVENT_CAPTURE_PARAMS);
    useEventListener('keydown', handleKeydown, handleContainerRef.current, EVENT_CAPTURE_PARAMS);
    useEventListener('click', handleContainerClick, handleContainerRef.current, EVENT_CAPTURE_PARAMS);
    useEventListener('pointerdown', handlePointerDown, interactiveTarget, EVENT_CAPTURE_PARAMS);

    // Use custom handle if requested.
    const Handle = handle || <ReactCompareSliderHandle disabled={disabled} portrait={portrait} />;
    const appliedTransition = canTransition ? transition : undefined;

    const rootStyle: CSSProperties = {
      position: 'relative',
      display: 'grid',
      maxWidth: '100%',
      maxHeight: '100%',
      overflow: 'hidden',
      cursor: isDragging ? (portrait ? 'ns-resize' : 'ew-resize') : undefined,
      touchAction: 'pan-y',
      userSelect: 'none',
      KhtmlUserSelect: 'none',
      msUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      ...style,
    };

    return (
      <div {...props} ref={rootContainerRef} style={rootStyle} data-rcs-clip={clip} data-rcs="root">
        <ContainerItem
          clip={clip}
          item={ReactCompareSliderClipOption.itemOne}
          portrait={portrait}
          transition={appliedTransition}
        >
          {itemOne}
        </ContainerItem>

        <ContainerItem
          clip={clip}
          item={ReactCompareSliderClipOption.itemTwo}
          portrait={portrait}
          transition={appliedTransition}
        >
          {itemTwo}
        </ContainerItem>

        <ContainerHandle
          disabled={disabled}
          portrait={portrait}
          ref={handleContainerRef}
          transition={appliedTransition}
        >
          {Handle}
        </ContainerHandle>
      </div>
    );
  },
);

ReactCompareSlider.displayName = 'ReactCompareSlider';
