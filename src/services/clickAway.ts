import { RefObject, useCallback, useEffect } from "react";

export type ClickAwayHandler = (e: MouseEvent | TouchEvent) => void;

const options = { capture: true };

export default function useClickAway<TElement extends HTMLElement>(
    ref: RefObject<TElement>,
    onClickAway: ClickAwayHandler,
) {
    const listener = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
                onClickAway(event);
            }
        },
        [ref, onClickAway],
    );

    useEventListener("click", listener, options);
    useEventListener("touchend", listener, options);
}

function useEventListener<TEvent extends keyof DocumentEventMap>(
    type: TEvent,
    listener: (this: Document, ev: DocumentEventMap[TEvent]) => any,
    options?: boolean | AddEventListenerOptions,
) {
    useEffect(() => {
        document.addEventListener(type, listener, options);

        return () => document.removeEventListener(type, listener, options);
    }, [type, listener, options]);
}
