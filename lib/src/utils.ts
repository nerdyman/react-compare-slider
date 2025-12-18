import { type CSSProperties, useEffect, useRef } from 'react';

/**
 * Stand-alone CSS utility to make replaced elements (`img`, `video`, etc.) fit their container.
 */
export const styleFitContainer = ({
  display = 'block',
  width = '100%',
  height = '100%',
  maxWidth = '100%',
  boxSizing = 'border-box',
  objectFit = 'cover',
  objectPosition = 'center center',
  ...props
}: CSSProperties = {}): CSSProperties => ({
  display,
  width,
  height,
  maxWidth,
  boxSizing,
  objectFit,
  objectPosition,
  ...props,
});

/**
 * Event listener binding hook.
 * @param eventName        Event to bind to.
 * @param handler          Callback handler.
 * @param element          Element to bind to.
 * @param handlerOptions  Event handler options.
 */
export const useEventListener = (
  eventName: EventListener['name'],
  handler: EventListener['caller'],
  element: EventTarget | undefined | null,
  handlerOptions: AddEventListenerOptions,
): void => {
  const savedHandler = useRef<EventListener['caller']>(undefined);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener.
    if (!element?.addEventListener) return;

    // Create event listener that calls handler function stored in ref.
    const eventListener: EventListener = (event) => savedHandler.current?.(event);

    element.addEventListener(eventName, eventListener, handlerOptions);

    return (): void => {
      element.removeEventListener(eventName, eventListener, handlerOptions);
    };
  }, [eventName, element, handlerOptions]);
};
