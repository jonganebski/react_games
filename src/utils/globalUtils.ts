import { Record } from "types/global.types";

export const timeToString = (milliSeconds: number) => {
  const diffInMin = milliSeconds / 60000;
  const min = Math.floor(diffInMin);

  const diffInSec = (diffInMin - min) * 60;
  const sec = Math.floor(diffInSec);

  const diffInMs = (diffInSec - sec) * 100;
  const millisec = Math.floor(diffInMs);

  const minStr = min.toString().padStart(2, "0");
  const secStr = sec.toString().padStart(2, "0");
  const millisecStr = millisec.toString().padStart(2, "0");

  return `${minStr}:${secStr}:${millisecStr}`;
};

export const processData = (arr: string[]) => {
  const result: [string, string][] = [];
  const set: [string, string] = ["", ""];
  arr.forEach((el, i) => {
    if (i === 0 || i % 2 === 0) {
      set[0] = el;
    } else {
      set[1] = el;
      result.push([set[0], set[1]]);
    }
  });
  return result;
};

export const sortLBDescend = (a: Record, b: Record) => +b[1] - +a[1];
