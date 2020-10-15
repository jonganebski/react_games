import React, { useEffect, useState } from "react";
import { TOver, TStart } from "../@types/minesweeper";
import { timeToString } from "../utils/globalUtils";

interface ITimerProps {
  start: TStart;
  over: TOver;
  isReady: boolean;
}

const Timer: React.FC<ITimerProps> = ({ start, over, isReady }) => {
  const [time, setTime] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => {
    if (start.bool) {
      setStartedAt(Date.now());
    } else {
      setTimeout(() => {
        setTime(0);
      }, 100);
    }
  }, [start.bool]);

  useEffect(() => {
    if (start.bool && startedAt && !over.bool) {
      setTimeout(() => {
        const elapsedTime = Date.now() - startedAt;
        setTime(elapsedTime);
      }, 10);
    }
  }, [time, start.bool, over.bool, startedAt]);

  useEffect(() => {
    if (over.bool) {
      setTimeout(() => {
        const time = document.getElementById("time")?.innerText;
        console.log(time);
      }, 100);
    }
  }, [over.bool]);

  return (
    <>
      <div id="time">{timeToString(time)}</div>
    </>
  );
};

export default Timer;
