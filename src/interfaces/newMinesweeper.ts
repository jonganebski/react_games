export interface Difficulty {
  totalMines: number;
  size: { x: number; y: number };
  level: "easy" | "midd" | "hard";
}
