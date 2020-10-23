import { TTetriShape } from "../@types/tetris";

export const TETRIMINO: { [key: string]: TTetriShape } = {
  I: [
    [".", "I", ".", "."],
    [".", "I", ".", "."],
    [".", "I", ".", "."],
    [".", "I", ".", "."],
  ],
  O: [
    ["O", "O"],
    ["O", "O"],
  ],
  T: [
    [".", "T", "."],
    ["T", "T", "T"],
    [".", ".", "."],
  ],
  J: [
    [".", "J", "."],
    [".", "J", "."],
    ["J", "J", "."],
  ],
  L: [
    ["L", ".", "."],
    ["L", ".", "."],
    ["L", "L", "."],
  ],
  S: [
    [".", ".", "."],
    [".", "S", "S"],
    ["S", "S", "."],
  ],
  Z: [
    [".", ".", "."],
    ["Z", "Z", "."],
    [".", "Z", "Z"],
  ],
};

export const MATRIX_W = 10;
export const MATRIX_H = 20;

export const CELL_WIDTH = "20px";
export const CELL_HEIGHT = "20px";
