import { useEffect, useState } from "react";
import { TMatrix, TTetriminos } from "../../@types/tetris";
import { MATRIX_H, MATRIX_W } from "../../constants/tetris";

export const useMatrix = (
  tetri: TTetriminos
): [TMatrix, React.Dispatch<React.SetStateAction<TMatrix>>] => {
  const [matrix, setMatrix] = useState(
    Array(MATRIX_H).fill(Array(MATRIX_W).fill([".", "free"])) as TMatrix
  );

  useEffect(() => {
    const updateMatrix = (matrix: TMatrix) => {
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
      return newMatrix;
    };

    setMatrix((prev) => updateMatrix(prev));
  }, [tetri]);

  return [matrix, setMatrix];
};
