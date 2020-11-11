import { GameStatus, Status } from "../../@types/newMinsweeper";
import { Difficulty } from "interfaces/newMinesweeper";
import { useEffect, useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";
import { autoReveal } from "./useCell";

export const useField = () => {
  const [field, setField] = useState<CellService[][] | null>(null);

  const getMinesIdx = (
    startingRowIdx: number | null,
    startingColIdx: number | null,
    difficulty: Difficulty
  ) => {
    const {
      size: { x, y },
      totalMines,
    } = difficulty;
    let mineExceptionIdx = 0;
    if (startingRowIdx && startingColIdx) {
      mineExceptionIdx = startingRowIdx * x + startingColIdx;
    }
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
    return mineIndexes;
  };

  const handleInitialClick = (
    field: CellService[][],
    startingRowIdx: number,
    startingColIdx: number
  ) => {
    const { value } = field[startingRowIdx][startingColIdx].changeStatus(
      "reveal"
    );
    if (value === "") {
      autoReveal(field, startingRowIdx, startingColIdx);
    }
  };

  const generateField = (
    difficulty: Difficulty,
    startingRowIdx: number | null,
    startingColIdx: number | null
  ) => {
    const {
      size: { x, y },
    } = difficulty;
    const baseArray = Array(y).fill(Array(x).fill(false));
    const flatBaseArray = baseArray.flat();
    const mineIndexes = getMinesIdx(startingRowIdx, startingColIdx, difficulty);
    mineIndexes.forEach((idx) => {
      flatBaseArray[idx] = true;
    });
    let deployedArr: boolean[][] = [];
    for (let j = 0; j < y; j++) {
      const row = flatBaseArray.slice(j * x, (j + 1) * x);
      deployedArr.push(row);
    }

    const newField = deployedArr.map((row, rowIdx) =>
      row.map((isMine, colIdx) => {
        let status: Status = "init";
        return new CellService(
          isMine,
          false,
          status,
          rowIdx,
          colIdx,
          deployedArr
        );
      })
    );
    if (startingRowIdx && startingColIdx) {
      handleInitialClick(newField, startingRowIdx, startingColIdx);
    }

    setField(newField);
  };

  return {
    field,
    setField,
    generateField,
  };
};
