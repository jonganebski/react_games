import { DEV_SERVER_URL } from "./global";

export const easy = {
  totalMines: 10,
  size: { x: 9, y: 9 },
  level: "easy",
};
export const midd = {
  totalMines: process.env.NODE_ENV === "development" ? 1 : 40,
  size: { x: 16, y: 16 },
  level: "midd",
};

export const hard = {
  totalMines: 99,
  size: { x: 30, y: 16 },
  level: "hard",
};
export const mineBoxSize = 30;

const POST_URL = "/api/minesweeper/post";
const GET_URL = "/api/minesweeper/leaderboard";

export const MINESWEEPER_POST_URL =
  process.env.NODE_ENV === "development" ? DEV_SERVER_URL + POST_URL : POST_URL;

export const MINESWEEPER_GET_URL =
  process.env.NODE_ENV === "development" ? DEV_SERVER_URL + GET_URL : GET_URL;
