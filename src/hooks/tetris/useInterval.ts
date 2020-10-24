import { useEffect, useRef } from "react";

export const useInterval = (callback: Function, delay: number | null) => {
  const callbackRef = useRef<Function>(() => {});
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => callbackRef.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
