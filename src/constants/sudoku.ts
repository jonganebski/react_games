export const possibleNums = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const SUDOKU_POST_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/sudoku/post"
    : "/api/sudoku/post";
