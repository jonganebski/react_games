import { Difficulty } from "interfaces/minesweeper.interface";
import { DEV_SERVER_URL, HEROKU_SERVER_URL } from "./global";

const POST_URL = "/api/minesweeper/post";
const GET_URL = "/api/minesweeper/leaderboard";

export const easy: Difficulty = {
  totalMines: 10,
  size: { x: 9, y: 9 },
  level: "easy",
  GET_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + GET_URL + "/easy"
      : HEROKU_SERVER_URL + GET_URL + "/easy",
  POST_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + POST_URL + "/easy"
      : HEROKU_SERVER_URL + POST_URL + "/easy",
};
export const midd: Difficulty = {
  totalMines: process.env.NODE_ENV === "development" ? 1 : 40,
  size: { x: 16, y: 16 },
  level: "midd",
  GET_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + GET_URL + "/midd"
      : HEROKU_SERVER_URL + GET_URL + "/midd",
  POST_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + POST_URL + "/midd"
      : HEROKU_SERVER_URL + POST_URL + "/midd",
};

export const hard: Difficulty = {
  totalMines: 99,
  size: { x: 30, y: 16 },
  level: "hard",
  GET_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + GET_URL + "/hard"
      : HEROKU_SERVER_URL + GET_URL + "/hard",
  POST_URL:
    process.env.NODE_ENV === "development"
      ? DEV_SERVER_URL + POST_URL + "/hard"
      : HEROKU_SERVER_URL + POST_URL + "/hard",
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
  NERVOUS: "😨",
  DEAD: "💀",
  PARTY: "😎",
};

export const IMG_URLS = [
  "https://images.unsplash.com/photo-1548062005-e50d06091399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1552&q=80",
  "https://images.unsplash.com/photo-1566228491370-09296660a1ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2051&q=80",
  "https://images.unsplash.com/photo-1567274333060-04b18e634717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1588&q=80",
  "https://images.unsplash.com/photo-1583264609967-cc319eca64fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1596&q=80",
  "https://images.unsplash.com/photo-1589271755419-b813a577ad42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1901&q=80",
  "https://images.unsplash.com/photo-1506375797236-81f17062bcf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2062&q=80",
  "https://images.unsplash.com/photo-1442033025416-c6a7da752d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1959&q=80",
  "https://images.unsplash.com/photo-1543945152-e7a51479bbc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
  "https://images.unsplash.com/photo-1602111958416-472aed6d6fc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
  "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80",
  "https://images.unsplash.com/photo-1603161729156-d11fb6d8abe2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
  "https://images.unsplash.com/photo-1582865605311-bb6a6341e814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
];
