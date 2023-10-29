import type { CSSProperties, RefObject } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

/** Keyboard `key` events to trigger slider movement. */
export enum KeyboardEventKeys {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
}

/**
 * Stand-alone CSS utility to make replaced elements (`img`, `video`, etc.) fit their container.
 */
export const styleFitContainer = ({
  boxSizing = 'border-box',
  objectFit = 'cover',
  objectPosition = 'center center',
  ...props
}: CSSProperties = {}): CSSProperties => ({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  boxSizing,
  objectFit,
  objectPosition,
  ...props,
});

/** Store the previous supplied value. */
export const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

/**
 * Event listener binding hook.
 * @param eventName      - Event to bind to.
 * @param handler        - Callback handler.
 * @param element        - Element to bind to.
 * @param handlerOptions - Event handler options.
 */
export const useEventListener = (
  eventName: EventListener['name'],
  handler: EventListener['caller'],
  element: EventTarget,
  handlerOptions: AddEventListenerOptions,
): void => {
  const savedHandler = useRef<EventListener['caller']>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener.
    if (!(element && element.addEventListener)) return;

    // Create event listener that calls handler function stored in ref.
    const eventListener: EventListener = (event) =>
      savedHandler.current && savedHandler.current(event);

    element.addEventListener(eventName, eventListener, handlerOptions);

    return (): void => {
      element.removeEventListener(eventName, eventListener, handlerOptions);
    };
  }, [eventName, element, handlerOptions]);
};

/**
 * Conditionally use `useLayoutEffect` for client *or* `useEffect` for SSR.
 * @see https://github.com/reduxjs/react-redux/blob/89a86805f2fcf9e8fbd2d1dae345ec791de4a71f/src/utils/useIsomorphicLayoutEffect.ts
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

/** Params passed to `useResizeObserver` `handler` function. */
export type UseResizeObserverHandlerProps = DOMRect;

/**
 * Bind resize observer callback to element.
 * @param ref       - Element to bind to.
 * @param handler   - Callback for handling entry's bounding rect.
 */
export const useResizeObserver = (
  ref: RefObject<Element>,
  handler: (entry: UseResizeObserverHandlerProps) => void,
): void => {
  const observer = useRef<ResizeObserver>();

  const observe = useCallback(() => {
    if (ref.current && observer.current) observer.current.observe(ref.current);
  }, [ref]);

  // Bind/rebind observer when `handler` changes.
  useIsomorphicLayoutEffect(() => {
    observer.current = new ResizeObserver(([entry]) => handler(entry!.contentRect));
    observe();

    return (): void => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handler, observe]);
};
