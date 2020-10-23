import { useEffect, useState } from "react";
import { TMatrix, TTetriminos } from "../../@types/tetris";
import { createMatrix } from "../../utils/Tetris/utils";

export const useMatrix = (
  tetri: TTetriminos,
  resetTetri: () => void
): [TMatrix, React.Dispatch<React.SetStateAction<TMatrix>>] => {
  const [matrix, setMatrix] = useState(createMatrix());

  useEffect(() => {
    const clearLines = (matrix: TMatrix): TMatrix => {
      const newMatrix: TMatrix = [];
      matrix.forEach((row) => {
        if (row.some((cell) => cell[1] === "free")) {
          newMatrix.push(row);
        } else {
          const newRow = Array(row.length).fill([".", "free"]);
          newMatrix.unshift(newRow);
        }
      });
      return newMatrix;
    };

    const updateMatrix = (matrix: TMatrix): TMatrix => {
      // Clear acting tetrimino
      const newMatrix = matrix.map((row) =>
        row.map((cell) => (cell[1] === "free" ? [".", "free"] : cell))
      );
      // Deploy acting tetrimino with new position
      tetri.shape.forEach((row, y) =>
        row.forEach((value, x) => {
          if (value !== ".") {
            const rowIdx = tetri.pos.y + y;
            const colIdx = tetri.pos.x + x;
            const status = tetri.collided ? "locked" : "free";
            newMatrix[rowIdx][colIdx] = [value, status];
          }
        })
      );
      if (tetri.collided) {
        resetTetri();
        return clearLines(newMatrix);
      }
      return newMatrix;
    };

    // MAIN JOB
    setMatrix((prev) => updateMatrix(prev));
  }, [resetTetri, tetri]);

  return [matrix, setMatrix];
};
