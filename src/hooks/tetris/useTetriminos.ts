import { useCallback, useState } from "react";
import { TMatrix, TTetriminos, TTetriShape } from "types/tetris.types";
import { TETRIMINO } from "constants/tetris";
import { checkWillCollide, getRandTetri } from "utils/Tetris/utils";

export const useTetriminos = (): [
  TTetriminos,
  TTetriminos,
  () => void,
  (dirX: number, dirY: number, collided: boolean) => void,
  (matrix: TMatrix) => void
] => {
  const [tetri, setTetri] = useState<TTetriminos>({
    pos: { x: 4, y: 0 },
    shape: TETRIMINO.void,
    collided: false,
  });
  const [nextTetri, setNextTetri] = useState<TTetriminos>({
    pos: { x: 4, y: 0 },
    shape: TETRIMINO.void,
    collided: false,
  });

  const resetTetri = useCallback(() => {
    setTetri({
      pos: { x: 4, y: 0 },
      shape:
        nextTetri.shape === TETRIMINO.void ? getRandTetri() : nextTetri.shape,
      collided: false,
    });
    setNextTetri({
      pos: { x: 4, y: 0 },
      shape: getRandTetri(),
      collided: false,
    });
  }, [nextTetri.shape]);

  const updateTetri = (dirX: number, dirY: number, collided: boolean) =>
    setTetri((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + dirX, y: prev.pos.y + dirY },
      collided,
    }));

  const rotateTetri = (shape: TTetriShape, dir: 1 | -1) => {
    const flippedOver = shape.map((_, i) => shape.map((col) => col[i]));
    if (dir === 1) {
      // clockwise
      return flippedOver.map((row) => row.reverse());
    } else {
      // counter clockwise
      return flippedOver.reverse();
    }
  };

  const rotate = (matrix: TMatrix) => {
    const copiedTetri = JSON.parse(JSON.stringify(tetri)) as TTetriminos;
    copiedTetri.shape = rotateTetri(copiedTetri.shape, 1);
    let offset = 1;
    const posX = copiedTetri.pos.x;
    while (checkWillCollide(matrix, copiedTetri, 0, 0)) {
      copiedTetri.pos.x += offset;
      const cousion = offset > 0 ? 1 : -1;
      offset = -(offset + cousion); // 1, -2, 3, -4, 5, -6 ...
      if (offset > copiedTetri.shape[0].length + 1) {
        rotateTetri(copiedTetri.shape, -1);
        copiedTetri.pos.x = posX;
        return;
      }
    }
    setTetri(copiedTetri);
    return;
  };

  return [tetri, nextTetri, resetTetri, updateTetri, rotate];
};
