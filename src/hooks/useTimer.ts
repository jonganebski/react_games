import { useState, useRef, useEffect } from "react";

export const useTimer = (stop: boolean) => {
  const [time, setTime] = useState(0);
  const startedAt = useRef(Date.now());

  const id = useRef(0);

  useEffect(() => {
    if (stop) {
      clearInterval(id.current);
      return;
    }
    id.current = setInterval(() => {
      setTime(Date.now() - startedAt.current);
    }, 1000);
    return () => clearInterval(id.current);
  }, [setTime, startedAt, stop]);

  return { time, setTime, startedAt };
};
