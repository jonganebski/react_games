import { TETRIMINO } from "../../constants/tetris";

export const getRandTetri = () => {
  const tetriminos = "IOTJLSZ";
  const randIdx = Math.floor(Math.random() * tetriminos.length);
  const randKey = tetriminos[randIdx];
  return TETRIMINO[randKey];
};

export const foo = "foo";
