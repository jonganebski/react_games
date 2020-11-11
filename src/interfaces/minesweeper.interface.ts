export interface Difficulty {
  totalMines: number;
  size: { x: number; y: number };
  level: "easy" | "midd" | "hard";
  GET_URL: string;
  POST_URL: string;
}
