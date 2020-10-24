import { TMatrix, TTetriminos } from "../../@types/tetris";
import { MATRIX_H, MATRIX_W, TETRIMINO } from "../../constants/tetris";

export const createMatrix = () =>
  Array(MATRIX_H).fill(Array(MATRIX_W).fill([".", "free"])) as TMatrix;

export const getRandTetri = () => {
  const tetriminos = "IOTJLSZ";
  const randIdx = Math.floor(Math.random() * tetriminos.length);
  const randKey = tetriminos[randIdx];
  return TETRIMINO[randKey];
};

export const checkWillCollide = (
  matrix: TMatrix,
  tetri: TTetriminos,
  dirX: number,
  dirY: number
) => {
  for (let y = 0; y < tetri.shape.length; ++y) {
    for (let x = 0; x < tetri.shape[y].length; ++x) {
      if (tetri.shape[y][x] !== ".") {
        const rowBelow = matrix[tetri.pos.y + y + dirY];
        const nextCell = rowBelow && rowBelow[x + tetri.pos.x + dirX];
        const isLocked = nextCell && nextCell[1] === "locked" ? true : false;
        if (!rowBelow || !nextCell || isLocked) {
          return true;
        }
      }
    }
  }
  return false;
};