import { useEffect, useRef, useState } from "react";
import { validator } from "utils/sudoku/utils";

export const useTemplate = (
  setSolved: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const coolTemplate = useRef<number[][]>([]);

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
          setSolved(true);
        }
      }
    }
  }, [hotTemplate, setSolved]);

  return { hotTemplate, setHotTemplate, coolTemplate };
};
