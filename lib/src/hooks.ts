'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardEventKeys, ReactCompareSliderClipOption, ReactCompareSliderCssVars } from './consts';
import type {
  SetPositionFromBoundsProps,
  UseReactCompareSliderProps,
  UseReactCompareSliderReturn,
} from './types';

/**
 * Hook to completely control the slider including all event handlers and state.
 * This is automatically used by the `ReactCompareSlider` component.
 * Only use this if you are building your own slider using the `react-compare-slider/components` module.
 */
export const useReactCompareSlider = ({
  boundsPadding = '0px',
  browsingContext = globalThis,
  changePositionOnHover = false,
  clip = ReactCompareSliderClipOption.both,
  defaultPosition = 50,
  disabled = false,
  keyboardIncrement = '5%',
  onlyHandleDraggable = false,
  onPositionChange,
  portrait = false,
  transition,
}: UseReactCompareSliderProps = {}): UseReactCompareSliderReturn => {
  /** DOM node of the root element. */
  const rootRef = useRef<HTMLDivElement>(null);
  /** DOM node of the handle container. */
  const handleRootRef = useRef<HTMLButtonElement>(null);
  /** Current position as a percentage value. */
  const position = useRef(defaultPosition);
  /** Whether user is currently dragging. */
  const [isDragging, setIsDragging] = useState(false);
  /** Whether the `transition` property can be applied. */
  const [canTransition, setCanTransition] = useState(true);
  /** Whether component has a `window` event binding. */
  const hasBrowsingContextBinding = useRef(false);
  /** Target container for pointer events. */
  const [interactiveTarget, setInteractiveTarget] = useState<HTMLElement | null>(null);

  const setPosition = useCallback(
    (nextPosition: number) => {
      const appliedPosition = Math.min(Math.max(nextPosition, 0), 100);

      rootRef.current?.style.setProperty(ReactCompareSliderCssVars.rawPosition, `${appliedPosition}%`);
      handleRootRef.current?.setAttribute('aria-valuenow', `${Math.round(appliedPosition)}`);
      position.current = appliedPosition;

      onPositionChange?.(appliedPosition);
    },
    [onPositionChange],
  );

  /** Set position using pointer coords. */
  const setPositionFromBounds = useCallback(
    function updateInternal({ x, y }: SetPositionFromBoundsProps) {
      const rootElement = rootRef.current as HTMLDivElement;
      const { width, height, top, left } = rootElement.getBoundingClientRect();

      // Early out when component has zero bounds.
      if (width === 0 || height === 0) return;

      const pixelPosition = portrait ? y - top - browsingContext.scrollY : x - left - browsingContext.scrollX;
      const nextPosition = (pixelPosition / (portrait ? height : width)) * 100;
      setPosition(nextPosition);
    },
    [browsingContext, portrait, setPosition],
  );

  /** Handle mouse/touch down. */
  const onPointerDown = useCallback(
    (ev: PointerEvent) => {
      ev.preventDefault();

      // Only handle left mouse button (touch events also use 0).
      if (disabled || ev.button !== 0) return;

      setPositionFromBounds({ x: ev.pageX, y: ev.pageY });
      setIsDragging(true);
      setCanTransition(true);
    },
    [disabled, setPositionFromBounds],
  );

  /** Handle mouse/touch move. */
  const onPointerMove = useCallback(
    function moveCall(ev: PointerEvent) {
      setPositionFromBounds({ x: ev.pageX, y: ev.pageY });
      setCanTransition(false);
    },
    [setPositionFromBounds],
  );

  /** Handle mouse/touch up. */
  const onPointerUp = useCallback((ev: PointerEvent) => {
    setIsDragging(false);
    setCanTransition(true);
  }, []);

  const onTouchEnd = useCallback((ev: TouchEvent) => {
    setIsDragging(false);
    setCanTransition(true);
  }, []);

  const onHandleRootClick = useCallback((ev: PointerEvent) => {
    ev.preventDefault();
    (ev.currentTarget as HTMLButtonElement)?.focus();
  }, []);

  /** Handle keyboard movment. */
  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (!Object.values(KeyboardEventKeys).includes(ev.key as KeyboardEventKeys)) {
        return;
      }

      ev.preventDefault();
      setCanTransition(true);

      const incrementPercentage =
        typeof keyboardIncrement === 'string'
          ? Number.parseFloat(keyboardIncrement)
          : (keyboardIncrement / (rootRef.current?.getBoundingClientRect().width as number)) * 100;

      const isIncrement = portrait
        ? ev.key === KeyboardEventKeys.ARROW_LEFT || ev.key === KeyboardEventKeys.ARROW_DOWN
        : ev.key === KeyboardEventKeys.ARROW_RIGHT || ev.key === KeyboardEventKeys.ARROW_UP;

      const nextPosition = isIncrement
        ? position.current + incrementPercentage
        : position.current - incrementPercentage;

      setPosition(nextPosition);
    },
    [keyboardIncrement, portrait, setPosition],
  );

  // Update bounds padding on change.
  useEffect(() => {
    rootRef.current?.style.setProperty(ReactCompareSliderCssVars.boundsPadding, boundsPadding);
  }, [boundsPadding]);

  // Set default position on mount props on mount.
  // biome-ignore lint/correctness/useExhaustiveDependencies: This intentionally only runs on mount.
  useEffect(() => {
    rootRef.current?.style.setProperty(ReactCompareSliderCssVars.rawPosition, `${defaultPosition}%`);
    handleRootRef.current?.setAttribute?.('aria-valuenow', Math.round(defaultPosition).toString());
  }, []);

  // Set target container for pointer events.
  useEffect(() => {
    setInteractiveTarget(onlyHandleDraggable ? handleRootRef.current : rootRef.current);
  }, [onlyHandleDraggable]);

  return {
    // Direct props
    boundsPadding,
    browsingContext,
    changePositionOnHover,
    clip,
    defaultPosition,
    disabled,
    keyboardIncrement,
    onlyHandleDraggable,
    portrait,
    transition,
    // Events
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchEnd,
    onHandleRootClick,
    // State
    canTransition,
    hasBrowsingContextBinding,
    isDragging,
    position,
    // Setters
    setPosition,
    setPositionFromBounds,
    // Elements
    rootRef,
    handleRootRef,
    interactiveTarget,
  };
};
