import { Difficulty } from "interfaces/newMinesweeper";

export const easy: Difficulty = {
  totalMines: 10,
  size: { x: 9, y: 9 },
  level: "easy",
};
export const midd: Difficulty = {
  totalMines: process.env.NODE_ENV === "development" ? 1 : 40,
  size: { x: 16, y: 16 },
  level: "midd",
};

export const hard: Difficulty = {
  totalMines: 99,
  size: { x: 30, y: 16 },
  level: "hard",
};
export const CELL_SIZE = 30;
