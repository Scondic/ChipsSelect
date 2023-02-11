import { useEffect } from "react";

export interface UseKeyPressProps {
  keyString: string;
  callback: () => void;
}

export const useKeyPress = ({ keyString, callback }: UseKeyPressProps) => {
  useEffect(() => {
    const onKeypress = ({ key }: { key: string }) => {
      if (key === keyString) {
        callback();
      }
    };

    window.addEventListener("keydown", onKeypress);
    return () => {
      window.removeEventListener("keydown", onKeypress);
    };
  }, []);
};
