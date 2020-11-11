import { Difficulty } from "interfaces/newMinesweeper";
import { useCallback, useEffect, useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";
import { autoReveal } from "./useCell";

export const useField = (difficulty: Difficulty) => {
  const [field, setField] = useState<CellService[][] | null>(null);
  const {
    size: { x, y },
    totalMines,
  } = difficulty;

  const deployMines = (startingRowIdx: number, startingColIdx: number) => {
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
      if (mineIndexes.size === totalMines) {
        break;
      }
    }
    mineIndexes.forEach((idx) => (baseArr[idx] = true));
    let deployedArr: boolean[][] = [];
    for (let j = 0; j < y; j++) {
      const row = baseArr.slice(j * x, (j + 1) * x);
      deployedArr.push(row);
    }
    console.log(field);

    const newField: CellService[][] = deployedArr.map((row, rowIdx, arr) =>
      row.map((isMine, colIdx) => {
        const status = field![rowIdx][colIdx].status;
        return new CellService(
          isMine,
          false,
          status === "flaged" || status === "question" ? status : "init",
          rowIdx,
          colIdx,
          arr
        );
      })
    );
    const initialCell = newField[startingRowIdx][startingColIdx];
    const { value } = initialCell.changeStatus("reveal");
    if (value === "") {
      autoReveal(newField, initialCell.rowIdx, initialCell.colIdx);
    }
    setField(newField);
  };

  const setDummyField = useCallback(() => {
    const undeployedArr: boolean[][] = Array(y).fill(Array(x).fill(false));
    const field: CellService[][] = undeployedArr.map((row, rowIdx, arr) =>
      row.map(
        (isMine, colIdx) =>
          new CellService(isMine, false, "init", rowIdx, colIdx, arr)
      )
    );
    setField(field);
  }, [x, y]);

  useEffect(() => {
    setDummyField();
  }, [setDummyField, x, y]);

  return {
    field,
    setField,
    deployMines,
    setDummyField,
  };
};
