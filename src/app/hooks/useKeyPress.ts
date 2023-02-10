import { useEffect } from "react";

export const useKeyPress = (keyInfo: string, callback: () => void) => {
  useEffect(() => {
    const onKeypress = ({ key }: { key: string }) => {
      if (key === keyInfo) {
        callback();
      }
    };

    window.addEventListener("keydown", onKeypress);
    return () => {
      window.removeEventListener("keydown", onKeypress);
    };
  }, []);
};
