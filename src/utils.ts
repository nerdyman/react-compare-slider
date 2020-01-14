import {
  RefObject,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { ResizeObserver } from 'resize-observer';
import { ContentRect } from 'resize-observer/lib/ContentRect';

/**
 * CSS style util for child to fit container
 */
export const styleFitContainer = ({
  objectFit = 'cover',
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

/**
 * Use previous value
 * @see https://usehooks.com/usePrevious/
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

/**
 * Event listener binding hook
 * @param eventName - Event to bind to
 * @param handler   - Callback handler
 * @param element   - Element to bind to
 * @see https://usehooks.com/useEventListener/
 */
export const useEventListener = (
  eventName: EventListener['name'],
  handler: EventListener['caller'],
  element: EventTarget = window,
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
      const eventListener: EventListener = event =>
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

/** Params passed to `useResizeObserver` `handler` function */
export type UseResizeObserverHandlerParams = ContentRect;

/**
 * Bind resize observer to ref
 * @param ref       - Ref to bind to
 * @param handler   - Callback for handling entry's bounding rect
 * @see https://tobbelindstrom.com/blog/resize-observer-hook/ https://codesandbox.io/s/zw8kylol8m
 */
export const useResizeObserver = (
  ref: RefObject<Element>,
  handler: (entry: UseResizeObserverHandlerParams) => void
): void => {
  const observer = useRef(
    new ResizeObserver(([entry]) => {
      handler && handler(entry.contentRect);
    })
  );

  const disconnect = useCallback(() => {
    const { current } = observer;
    current && current.disconnect();
  }, []);

  const observe = useCallback(() => {
    ref.current && observer.current.observe(ref.current);
  }, [ref]);

  useLayoutEffect(() => {
    observe();
    return (): void => disconnect();
  }, [disconnect, observe]);
};
