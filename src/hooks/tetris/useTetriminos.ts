import { useState } from "react";
import { TTetriminos } from "../../@types/tetris";
import { getRandTetri } from "../../utils/Tetris/utils";

export const useTetriminos = (): [
  TTetriminos,
  React.Dispatch<React.SetStateAction<TTetriminos>>
] => {
  const [tetri, setTetri] = useState<TTetriminos>({
    pos: { x: 4, y: 0 },
    shape: getRandTetri(),
    collided: false,
  });

  return [tetri, setTetri];
};
