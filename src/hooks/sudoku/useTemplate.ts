import { useCallback, useEffect, useRef, useState } from "react";
import { generateSudoku, validator } from "../../utils/sudoku/utils";

export const useTemplate = (
  setTime: React.Dispatch<React.SetStateAction<number>>,
  setSolved: React.Dispatch<React.SetStateAction<boolean>>,
  startedAt: React.MutableRefObject<number>
) => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const coolTemplate = useRef<number[][]>([]);

  const startGame = useCallback(() => {
    generateSudoku().then((initialTemplate) => {
      coolTemplate.current = initialTemplate;
      setHotTemplate(initialTemplate);
      setTime(0);
      startedAt.current = Date.now();
    });
  }, [setTime, startedAt]);

  useEffect(() => {
    // START GAME
    startGame();
  }, [startGame]);

  useEffect(() => {
    // DETERMINES GAME FINISHED OR NOT
    if (hotTemplate) {
      const allFilled = !hotTemplate?.some((row) =>
        row.some((num) => num === 0)
      );
      if (allFilled) {
        const correct = hotTemplate?.every((row, rowIdx) => {
          const rowValid = row.every((num, numIdx) => {
            const numValid = validator(rowIdx, numIdx, num, hotTemplate);
            return numValid;
          });
          return rowValid;
        });
        if (correct) {
          console.log("Congratulations!");
          setSolved(true);
        } else {
          console.log("Try again!");
        }
      }
    }
  }, [hotTemplate, setSolved]);

  return { hotTemplate, setHotTemplate, coolTemplate, startGame };
};
