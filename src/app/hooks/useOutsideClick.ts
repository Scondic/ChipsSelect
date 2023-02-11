import { useEffect } from "react";

export interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement>;
  callback: (e: Event) => void;
  enabled?: boolean;
}

export function useOutsideClick({
  ref,
  callback,
  enabled = true,
}: UseOutsideClickProps) {
  useEffect(() => {
    if (!enabled) return;

    const onMouseUp = (event: MouseEvent) => {
      callback(event);
    };

    document.addEventListener("mouseup", onMouseUp, true);

    return () => {
      document.removeEventListener("mouseup", onMouseUp, true);
    };
  }, [ref, callback, enabled]);
}
