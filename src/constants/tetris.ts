import { TTetriShape } from "../@types/tetris";

export const TETRIMINO: { [key: string]: TTetriShape } = {
  void: [["."]],
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
    [".", "S", "S"],
    ["S", "S", "."],
    [".", ".", "."],
  ],
  Z: [
    ["Z", "Z", "."],
    [".", "Z", "Z"],
    [".", ".", "."],
  ],
};

export const CELL_RGB: { [key: string]: string } = {
  ".": "0, 0, 0",
  I: "120, 239, 255",
  O: "255, 13, 19",
  T: "255, 232, 3",
  J: "25, 154, 255",
  L: "82, 230, 73",
  S: "230, 106, 226",
  Z: "255, 154, 0",
};

export const MATRIX_W = 10;
export const MATRIX_H = 24;

export const CELL_WIDTH = 30;
export const CELL_HEIGHT = 30;
