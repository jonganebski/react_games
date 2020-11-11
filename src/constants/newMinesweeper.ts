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

export const CELL_BORDER = {
  STANDARD: {
    TOP: "2px solid whitesmoke",
    RIGHT: "2px solid dimgray",
    BOTTOM: "2px solid dimgray",
    LEFT: "2px solid whitesmoke",
  },
  ON_DOWN: {
    TOP: "2px solid dimgray",
    RIGHT: "2px solid whitesmoke",
    BOTTOM: "2px solid whitesmoke",
    LEFT: "2px solid dimgray",
  },
};

export const IMOJI = {
  CHILL: "🙂",
  NERVOUS: "😮",
  DEAD: "💀",
  PARTY: "😎",
};
