import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardEventKeys, ReactCompareSliderClipOption, ReactCompareSliderCssVars } from './consts';
import type {
  SetPositionFromBoundsProps,
  UseReactCompareSliderProps,
  UseReactCompareSliderRefReturn,
  UseReactCompareSliderReturn,
} from './types';

/**
 * Control the position and access or modify the DOM elements of the slider.
 * Do not use this hook if you using `useReactCompareSlider` - it already provides these properties and more in
 * its return value.
 */
export const useReactCompareSliderRef = (): RefObject<UseReactCompareSliderRefReturn> =>
  useRef<UseReactCompareSliderRefReturn>({
    rootContainer: null,
    handleContainer: null,
    setPosition: () =>
      // biome-ignore lint/suspicious/noConsole: This intentionally warns users to help with debugging.
      console.warn('[react-compare-slider] `setPosition` cannot be used until the component has mounted.'),
  });

/**
 * Hook to completely control the slider including all event handlers and state.
 * This is automatically used by the `ReactCompareSlider` component.
 * Only use this if you are building your own slider from using the `react-compare-slider/components` module.
 */
export const useReactCompareSlider = ({
  boundsPadding = '0%',
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
    function updateInternal({ x, y, isOffset }: SetPositionFromBoundsProps) {
      const rootElement = rootRef.current as HTMLDivElement;
      const { width, height, top, left } = rootElement.getBoundingClientRect();

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

  /** Handle mouse/touch down. */
  const onPointerDown = useCallback(
    (ev: PointerEvent) => {
      ev.preventDefault();

      // Only handle left mouse button (touch events also use 0).
      if (disabled || ev.button !== 0) return;

      setPositionFromBounds({ x: ev.pageX, y: ev.pageY, isOffset: true });
      setIsDragging(true);
      setCanTransition(true);
    },
    [disabled, setPositionFromBounds],
  );

  /** Handle mouse/touch move. */
  const onPointerMove = useCallback(
    function moveCall(ev: PointerEvent) {
      setPositionFromBounds({ x: ev.pageX, y: ev.pageY, isOffset: true });
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

  /** Handle keyboard movment. */
  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (!Object.values(KeyboardEventKeys).includes(ev.key as KeyboardEventKeys)) {
        return;
      }

      ev.preventDefault();
      setCanTransition(true);

      const { top, left } = (handleRootRef.current as HTMLButtonElement).getBoundingClientRect();
      const { width, height } = (rootRef.current as HTMLDivElement).getBoundingClientRect();

      const incrementPercentage =
        typeof keyboardIncrement === 'string'
          ? Number.parseFloat(keyboardIncrement)
          : (keyboardIncrement / width) * 100;

      const isIncrement = portrait
        ? ev.key === KeyboardEventKeys.ARROW_LEFT || ev.key === KeyboardEventKeys.ARROW_DOWN
        : ev.key === KeyboardEventKeys.ARROW_RIGHT || ev.key === KeyboardEventKeys.ARROW_UP;

      const currentPosition = Number.parseFloat(
        handleRootRef.current?.getAttribute?.('aria-valuenow') as string,
      );

      const nextPosition = Math.min(
        Math.max(
          isIncrement ? currentPosition + incrementPercentage : currentPosition - incrementPercentage,
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

  // Update bounds padding on change.
  useEffect(() => {
    rootRef.current?.style.setProperty(ReactCompareSliderCssVars.boundsPadding, boundsPadding);
  }, [boundsPadding]);

  // Set default position on mount. This intentionally does not include `defaultPosition` in the dependency
  // to ensure it's only set once.
  useEffect(() => {
    rootRef.current?.style.setProperty(ReactCompareSliderCssVars.rawPosition, `${defaultPosition}%`);
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
