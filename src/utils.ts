import { RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

/**
 * Stand-alone CSS utility to make replaced elements (`img`, `video`, etc.) fit their
 * container.
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

/**
 * Event listener binding hook.
 * @param eventName      - Event to bind to.
 * @param handler        - Callback handler.
 * @param element        - Element to bind to.
 * @param handlerOptions - Event listener options.
 */
export const useEventListener = (
  eventName: EventListener['name'],
  handler: EventListener['caller'],
  element: EventTarget,
  handlerOptions: AddEventListenerOptions
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
 * @see <https://github.com/reduxjs/react-redux/blob/c581d480dd675f2645851fb006bef91aeb6ac24d/src/utils/useIsomorphicLayoutEffect.js>
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window.document && window.document.createElement
    ? useLayoutEffect
    : useEffect;

/** Params passed to `useResizeObserver` `handler` function. */
export type UseResizeObserverHandlerParams = DOMRect;

/**
 * Bind resize observer callback to element.
 * @param ref       - Element to bind to.
 * @param handler   - Callback for handling entry's bounding rect.
 */
export const useResizeObserver = (
  ref: RefObject<Element>,
  handler: (entry: UseResizeObserverHandlerParams) => void
): void => {
  const observer = useRef<ResizeObserver>();

  const observe = useCallback(() => {
    if (ref.current && observer.current) observer.current.observe(ref.current);
  }, [ref]);

  // Bind/rebind observer when `handler` changes.
  useIsomorphicLayoutEffect(() => {
    observer.current = new ResizeObserver(([entry]) => handler(entry.contentRect));
    observe();

    return (): void => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handler, observe]);
};
