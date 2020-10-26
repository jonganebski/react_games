import { useEffect, useState } from "react";

export const useGameStatus = (
  countCleared: number
): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [countTotalCleared, setcountTotalCleared] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  useEffect(() => {
    // Calculates score depend on how many lines user cleared at once.
    if (0 < countCleared) {
      setcountTotalCleared((prev) => prev + countCleared);
      const index =
        countCleared > linePoints.length
          ? linePoints.length - 1
          : countCleared - 1;
      setScore((prev) => prev + linePoints[index] * level);
    }
  }, [countCleared, level, linePoints]);

  return [
    countTotalCleared,
    setcountTotalCleared,
    level,
    setLevel,
    score,
    setScore,
  ];
};
