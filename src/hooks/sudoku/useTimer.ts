import { useState, useRef, useEffect } from "react";

export const useTimer = (solved: boolean) => {
  const [time, setTime] = useState(0);
  const startedAt = useRef(Date.now());

  const id = useRef(0);

  useEffect(() => {
    id.current = setInterval(() => {
      setTime(Date.now() - startedAt.current);
    }, 10);
    return () => clearInterval(id.current);
  }, [setTime, startedAt]);

  if (solved) {
    clearInterval(id.current);
  }

  return { time, setTime, startedAt };
};
