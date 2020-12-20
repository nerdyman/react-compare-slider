import {
  RefObject,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { ResizeObserver } from 'resize-observer';
import { ContentRect } from 'resize-observer/lib/ContentRect';

/** Whether runtime is client-side. */
const isClient = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Whether client supports the CSS `object-fit` property.
 */
export const supportsCssObjectFit = (): boolean => {
  // Assume object-fit is supported in SSR - it will be picked up again by the
  // client anyway.
  if (!isClient) return true;

  return (
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('object-fit', 'cover')
  );
};

/**
 * Stand-alone CSS utility to make replaced elements (`img`, `video`, etc.)
 * fit their container and maintain their aspect ratio.
 */
export const styleFitContainer = ({
  objectFit = 'cover',
  objectPosition = 'center',
  ...props
}: React.CSSProperties = {}): React.CSSProperties => ({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
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
 * @param eventName      - Event to bind to
 * @param handler        - Callback handler
 * @param element        - Element to bind to
 * @param handlerOptions - Event handler options
 */
export const useEventListener = (
  eventName: EventListener['name'],
  handler: EventListener['caller'],
  element: EventTarget,
  handlerOptions: AddEventListenerOptions
): void => {
  // Create a ref that stores handler
  const savedHandler = useRef<EventListener['caller']>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener: EventListener = (event) =>
        savedHandler.current && savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener, handlerOptions);

      // Remove event listener on cleanup
      return (): void => {
        element.removeEventListener(eventName, eventListener, handlerOptions);
      };
    },
    [eventName, element, handlerOptions] // Re-run if eventName or element changes
  );
};

/**
 * Conditionally use `useLayoutEffect` for client *or* `useEffect` for SSR.
 * @see https://github.com/reduxjs/react-redux/blob/c581d480dd675f2645851fb006bef91aeb6ac24d/src/utils/useIsomorphicLayoutEffect.js
 */
const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

/** Params passed to `useResizeObserver` `handler` function. */
export type UseResizeObserverHandlerParams = ContentRect;

/**
 * Bind resize observer callback to element.
 * @param ref       - Element to bind to.
 * @param handler   - Callback for handling entry's bounding rect.
 */
export const useResizeObserver = (
  ref: RefObject<Element>,
  handler: (entry: UseResizeObserverHandlerParams) => void
): void => {
  const observer = useRef(
    new ResizeObserver(([entry]) => handler(entry.contentRect))
  );

  const observe = useCallback(() => {
    ref.current && observer.current.observe(ref.current);
  }, [ref]);

  // Bind/rebind observer when `handler` changes.
  useIsomorphicLayoutEffect(() => {
    observer.current = new ResizeObserver(([entry]) =>
      handler(entry.contentRect)
    );
    observe();
    return (): void => observer.current.disconnect();
  }, [handler, observe]);
};
