import { useCallback, useState } from "react";
import { TTetriminos } from "../../@types/tetris";
import { TETRIMINO } from "../../constants/tetris";
import { getRandTetri } from "../../utils/Tetris/utils";

export const useTetriminos = (): [
  TTetriminos,
  React.Dispatch<React.SetStateAction<TTetriminos>>,
  () => void,
  (dirX: number, dirY: number, collided: boolean) => void
] => {
  const [tetri, setTetri] = useState<TTetriminos>({
    pos: { x: 4, y: 0 },
    shape: TETRIMINO.void,
    collided: false,
  });

  const resetTetri = useCallback(
    () =>
      setTetri({
        pos: { x: 4, y: 0 },
        shape: getRandTetri(),
        collided: false,
      }),
    []
  );

  const updateTetri = (dirX: number, dirY: number, collided: boolean) =>
    setTetri((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + dirX, y: prev.pos.y + dirY },
      collided,
    }));

  return [tetri, setTetri, resetTetri, updateTetri];
};
