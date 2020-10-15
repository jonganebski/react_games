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
