import { DEV_SERVER_URL } from "./global";

export const possibleNums = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const POST_URL = "/api/sudoku/post";
const GET_URL = "/api/sudoku/leaderboard";

export const SUDOKU_POST_URL =
  process.env.NODE_ENV === "development" ? DEV_SERVER_URL + POST_URL : POST_URL;

export const SUDOKU_GET_URL =
  process.env.NODE_ENV === "development" ? DEV_SERVER_URL + GET_URL : GET_URL;
