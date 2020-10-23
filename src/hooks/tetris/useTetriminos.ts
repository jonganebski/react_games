import { useState } from "react";
import { TTetriminos } from "../../@types/tetris";
import { getRandTetri } from "../../utils/Tetris/utils";

export const useTetriminos = (): [
  TTetriminos,
  React.Dispatch<React.SetStateAction<TTetriminos>>,
  (dirX: number, dirY: number) => void
] => {
  const [tetri, setTetri] = useState<TTetriminos>({
    pos: { x: 4, y: 0 },
    shape: getRandTetri(),
    collided: false,
  });

  const updateTetri = (dirX: number, dirY: number) =>
    setTetri((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + dirX, y: prev.pos.y + dirY },
    }));

  return [tetri, setTetri, updateTetri];
};
