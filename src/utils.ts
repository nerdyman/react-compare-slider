import { RefObject, useEffect, useRef, useLayoutEffect, useCallback } from 'react';

/** Whether runtime is client-side. */
const isClient = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Stand-alone CSS utility to make replaced elements (`img`, `video`, etc.) fit their
 * container.
 */
export const styleFitContainer = ({
  boxSizing = 'border-box',
  objectFit = 'cover',
  objectPosition = 'center',
  ...props
}: React.CSSProperties = {}): React.CSSProperties => ({
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
 * @see https://github.com/reduxjs/react-redux/blob/c581d480dd675f2645851fb006bef91aeb6ac24d/src/utils/useIsomorphicLayoutEffect.js
 */
const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

/** Params passed to `useResizeObserver` `handler` function. */
export type UseResizeObserverHandlerParams = DOMRect;

/**
 * Bind resize observer to ref.
 * @param ref       - Ref to bind to.
 * @param handler   - Callback for handling entry's bounding rect.
 * @see https://tobbelindstrom.com/blog/resize-observer-hook/ https://codesandbox.io/s/zw8kylol8m
 */
export const useResizeObserver = (
  ref: RefObject<Element>,
  handler: (entry: UseResizeObserverHandlerParams) => void
): void => {
  const observer = useRef(
    new ResizeObserver(([entry]) => {
      handler(entry.contentRect);
    })
  );

  const disconnect = useCallback(() => {
    const { current } = observer;
    current.disconnect();
  }, []);

  const observe = useCallback(() => {
    ref.current && observer.current.observe(ref.current);
  }, [ref]);

  useIsomorphicLayoutEffect(() => {
    observe();
    return (): void => disconnect();
  }, [disconnect, observe]);
};
