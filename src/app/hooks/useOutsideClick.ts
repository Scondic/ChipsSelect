import { useEffect } from "react";

export interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement>;
  handler: (e: Event) => void;
  enabled?: boolean;
}

export function useOutsideClick({
  ref,
  handler,
  enabled = true,
}: UseOutsideClickProps) {
  useEffect(() => {
    if (!enabled) return;

    const onMouseUp = (event: MouseEvent) => {
      handler(event);
    };

    document.addEventListener("mouseup", onMouseUp, true);

    return () => {
      document.removeEventListener("mouseup", onMouseUp, true);
    };
  }, [ref, handler, enabled]);
}
