import { easy, hard } from "constants/newMinesweeper";
import { Difficulty } from "interfaces/newMinesweeper";
import { useEffect, useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";
import { autoReveal } from "./useCell";

export const useField = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(hard);
  const [field, setField] = useState<CellService[][] | null>(null);

  const deployMines = (startingRowIdx: number, startingColIdx: number) => {
    const {
      size: { x, y },
    } = difficulty;
    const baseArr: boolean[] = Array(x * y)
      .fill(false)
      .flat();
    const mineExceptionIdx = startingRowIdx * x + startingColIdx;
    const mineIndexes = new Set<number>();
    for (let i = 0; i < 1000; i++) {
      const randIdx = Math.floor(Math.random() * x * y);
      if (randIdx === mineExceptionIdx) {
        continue;
      }
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
    const field: CellService[][] = deployedArr.map((row, rowIdx, arr) =>
      row.map((isMine, colIdx) => {
        return new CellService(isMine, false, "init", rowIdx, colIdx, arr);
      })
    );
    const initialCell = field[startingRowIdx][startingColIdx];
    const { value } = initialCell.changeStatus("reveal");
    if (value === "") {
      autoReveal(field, initialCell.rowIdx, initialCell.colIdx);
    }
    setField(field);
  };

  useEffect(() => {
    const {
      size: { x, y },
    } = difficulty;
    const undeployedArr: boolean[][] = Array(y).fill(Array(x).fill(false));
    const field: CellService[][] = undeployedArr.map((row, rowIdx, arr) =>
      row.map(
        (isMine, colIdx) =>
          new CellService(isMine, false, "init", rowIdx, colIdx, arr)
      )
    );
    setField(field);
  }, [difficulty]);

  return { difficulty, setDifficulty, field, setField, deployMines };
};
