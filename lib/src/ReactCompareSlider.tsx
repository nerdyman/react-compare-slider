import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { CSSProperties, ReactElement } from 'react';

import { ContainerHandle, ContainerItem } from './Container';
import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import {
  ReactCompareSliderClipOption,
  type ReactCompareSliderDetailedProps,
  type UseReactCompareSliderRefReturn,
} from './types';
import type { UseResizeObserverHandlerProps } from './utils';
import { usePrevious } from './utils';
import { KeyboardEventKeys, useEventListener, useResizeObserver } from './utils';

/** Properties for internal `updateInternalPosition` callback. */
interface UpdateInternalPositionProps {
  /** X coordinate to update to (landscape). */
  x: number;
  /** Y coordinate to update to (portrait). */
  y: number;
  /** Whether to calculate using page X and Y offsets (required for pointer events). */
  isOffset?: boolean;
}

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
export const ReactCompareSlider = forwardRef<
  UseReactCompareSliderRefReturn,
  ReactCompareSliderDetailedProps
>(
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
  ): ReactElement => {
    /** DOM node of the root element. */
    const rootContainerRef = useRef<HTMLDivElement>(null);
    /** DOM node `itemOne` container. */
    const clipContainerOneRef = useRef<HTMLDivElement>(null);
    /** DOM node of `itemTwo`. */
    const clipContainerTwoRef = useRef<HTMLDivElement>(null);
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

    /** Sync the internal position and trigger position change callback if defined. */
    const updateInternalPosition = useCallback(
      function updateInternal({ x, y, isOffset }: UpdateInternalPositionProps) {
        const rootElement = rootContainerRef.current as HTMLDivElement;
        const handleElement = handleContainerRef.current as HTMLButtonElement;
        const clipElementOne = clipContainerOneRef.current as HTMLDivElement;
        const clipElementTwo = clipContainerTwoRef.current as HTMLDivElement;
        const { width, height, left, top } = rootElement.getBoundingClientRect();

        // Early out when component has zero bounds.
        if (width === 0 || height === 0) {
          return;
        }

        const pixelPosition = portrait
          ? isOffset
            ? y - top - browsingContext.scrollY
            : y
          : isOffset
          ? x - left - browsingContext.scrollX
          : x;

        /** Next position as percentage. */
        const nextPosition = Math.min(
          Math.max((pixelPosition / (portrait ? height : width)) * 100, 0),
          100,
        );

        const zoomScale = portrait
          ? height / (rootElement.offsetHeight || 1)
          : width / (rootElement.offsetWidth || 1);

        const boundsPaddingPercentage =
          ((boundsPadding * zoomScale) / (portrait ? height : width)) * 100;

        const nextPositionWithBoundsPadding = Math.min(
          Math.max(nextPosition, boundsPaddingPercentage * zoomScale),
          100 - boundsPaddingPercentage * zoomScale,
        );

        internalPosition.current = nextPosition;
        handleElement.setAttribute('aria-valuenow', `${Math.round(internalPosition.current)}`);
        handleElement.style.top = portrait ? `${nextPositionWithBoundsPadding}%` : '0';
        handleElement.style.left = portrait ? '0' : `${nextPositionWithBoundsPadding}%`;

        const clipBoth = clip === ReactCompareSliderClipOption.both;

        if (clipBoth || clip === ReactCompareSliderClipOption.itemOne) {
          clipElementOne.style.clipPath = portrait
            ? `inset(0 0 ${100 - nextPositionWithBoundsPadding}% 0)`
            : `inset(0 ${100 - nextPositionWithBoundsPadding}% 0 0)`;
        } else {
          clipElementOne.style.clipPath = 'none';
        }

        if (clipBoth || clip === ReactCompareSliderClipOption.itemTwo) {
          clipElementTwo.style.clipPath = portrait
            ? `inset(${nextPositionWithBoundsPadding}% 0 0 0)`
            : `inset(0 0 0 ${nextPositionWithBoundsPadding}%)`;
        } else {
          clipElementTwo.style.clipPath = 'none';
        }

        if (onPositionChange) {
          onPositionChange(internalPosition.current);
        }
      },
      [browsingContext, boundsPadding, clip, onPositionChange, portrait],
    );

    // Update internal position when other user controllable props change.
    useEffect(() => {
      const { width, height } = (
        rootContainerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      // Use current internal position if `position` hasn't changed.
      const nextPosition = position === previousPosition ? internalPosition.current : position;

      updateInternalPosition({
        x: (width / 100) * nextPosition,
        y: (height / 100) * nextPosition,
      });
    }, [boundsPadding, clip, position, portrait, previousPosition, updateInternalPosition]);

    /** Handle mouse/touch down. */
    const handlePointerDown = useCallback(
      (ev: PointerEvent) => {
        ev.preventDefault();

        // Only handle left mouse button (touch events also use 0).
        if (disabled || ev.button !== 0) return;

        updateInternalPosition({ isOffset: true, x: ev.pageX, y: ev.pageY });
        setIsDragging(true);
        setCanTransition(true);
      },
      [disabled, updateInternalPosition],
    );

    /** Handle mouse/touch move. */
    const handlePointerMove = useCallback(
      function moveCall(ev: PointerEvent) {
        updateInternalPosition({ isOffset: true, x: ev.pageX, y: ev.pageY });
        setCanTransition(false);
      },
      [updateInternalPosition],
    );

    /** Handle mouse/touch up. */
    const handlePointerUp = useCallback(() => {
      setIsDragging(false);
      setCanTransition(true);
    }, []);

    /** Resync internal position on resize. */
    const handleResize: (resizeProps: UseResizeObserverHandlerProps) => void = useCallback(
      ({ width, height }) => {
        const { width: scaledWidth, height: scaledHeight } = (
          rootContainerRef.current as HTMLDivElement
        ).getBoundingClientRect();

        updateInternalPosition({
          x: ((width / 100) * internalPosition.current * scaledWidth) / width,
          y: ((height / 100) * internalPosition.current * scaledHeight) / height,
        });
      },
      [updateInternalPosition],
    );

    /** Handle keyboard movment. */
    const handleKeydown = useCallback(
      (ev: KeyboardEvent) => {
        if (!Object.values(KeyboardEventKeys).includes(ev.key as KeyboardEventKeys)) {
          return;
        }

        ev.preventDefault();
        setCanTransition(true);

        const { top, left } = (
          handleContainerRef.current as HTMLButtonElement
        ).getBoundingClientRect();

        const { width, height } = (
          rootContainerRef.current as HTMLDivElement
        ).getBoundingClientRect();

        const isPercentage = typeof keyboardIncrement === 'string';
        const incrementPercentage = isPercentage
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

        updateInternalPosition({
          x: portrait ? left : (width * nextPosition) / 100,
          y: portrait ? (height * nextPosition) / 100 : top,
        });
      },
      [keyboardIncrement, portrait, updateInternalPosition],
    );

    // Set target container for pointer events.
    useEffect(() => {
      setInteractiveTarget(
        onlyHandleDraggable ? handleContainerRef.current : rootContainerRef.current,
      );
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
            const { width, height } = (
              rootContainerRef.current as HTMLDivElement
            ).getBoundingClientRect();

            updateInternalPosition({
              x: (width / 100) * nextPosition,
              y: (height / 100) * nextPosition,
            });
          },
        };
      },
      [updateInternalPosition],
    );

    // Bind resize observer to container.
    useResizeObserver(rootContainerRef, handleResize);

    useEventListener(
      'keydown',
      handleKeydown,
      handleContainerRef.current as HTMLButtonElement,
      EVENT_CAPTURE_PARAMS,
    );

    useEventListener(
      'click',
      handleContainerClick,
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
    const Handle = handle || <ReactCompareSliderHandle disabled={disabled} portrait={portrait} />;
    const appliedTransition = canTransition ? transition : undefined;

    const rootStyle: CSSProperties = {
      position: 'relative',
      display: 'grid',
      maxWidth: '100%',
      maxHeight: '100%',
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
        <ContainerItem ref={clipContainerOneRef} transition={appliedTransition}>
          {itemOne}
        </ContainerItem>

        <ContainerItem ref={clipContainerTwoRef} transition={appliedTransition}>
          {itemTwo}
        </ContainerItem>

        <ContainerHandle
          disabled={disabled}
          portrait={portrait}
          position={Math.round(internalPosition.current)}
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
