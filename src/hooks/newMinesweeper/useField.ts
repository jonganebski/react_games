import { easy } from "constants/newMinesweeper";
import { Difficulty } from "interfaces/newMinesweeper";
import { useEffect, useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";

export const useField = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(easy);
  const [field, setField] = useState<CellService[][] | null>(null);

  useEffect(() => {
    const deployMines = () => {
      const {
        size: { x, y },
      } = difficulty;
      const baseArr: boolean[] = Array(x * y)
        .fill(false)
        .flat();
      const mineIndexes = new Set<number>();
      for (let i = 0; i < 1000; i++) {
        const randIdx = Math.floor(Math.random() * x * y);
        mineIndexes.add(randIdx);
        if (mineIndexes.size === difficulty.totalMines) {
          break;
        }
      }
      mineIndexes.forEach((idx) => (baseArr[idx] = true));
      let deployedArr: boolean[][] = [];
      for (let j = 0; j < y; j++) {
        const row = baseArr.slice(j * x, (j + 1) * x);
        deployedArr.push(row);
      }
      return deployedArr;
    };

    const field: CellService[][] = deployMines().map((row, rowIdx, arr) =>
      row.map(
        (isMine, colIdx) => new CellService(isMine, "init", rowIdx, colIdx, arr)
      )
    );
    setField(field);
    console.log(field);
  }, [difficulty]);

  return { difficulty, setDifficulty, field };
};
