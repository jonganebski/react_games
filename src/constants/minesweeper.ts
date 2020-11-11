import { Difficulty } from "interfaces/minesweeper.interface";
import { DEV_SERVER_URL } from "./global";

const POST_URL = "/api/minesweeper/post";
const GET_URL = "/api/minesweeper/leaderboard";

export const easy: Difficulty = {
  totalMines: 10,
  size: { x: 9, y: 9 },
  level: "easy",
  GET_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + GET_URL + "/easy"
      : GET_URL + "/easy",
  POST_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + POST_URL + "/easy"
      : POST_URL + "/easy",
};
export const midd: Difficulty = {
  totalMines: process.env.NODE_ENV === "development" ? 1 : 40,
  size: { x: 16, y: 16 },
  level: "midd",
  GET_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + GET_URL + "/midd"
      : GET_URL + "/midd",
  POST_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + POST_URL + "/midd"
      : POST_URL + "/midd",
};

export const hard: Difficulty = {
  totalMines: 99,
  size: { x: 30, y: 16 },
  level: "hard",
  GET_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + GET_URL + "/hard"
      : GET_URL + "/hard",
  POST_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + POST_URL + "/hard"
      : POST_URL + "/hard",
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
