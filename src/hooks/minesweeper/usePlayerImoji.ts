import { GameStatus } from "../../types/minsweeper.types";
import { useEffect, useState } from "react";
import { IMOJI } from "constants/minesweeper";

export const usePlayerEmoji = (gameStatus: GameStatus) => {
  const [imoji, setImoji] = useState(IMOJI.CHILL);

  useEffect(() => {
    if (gameStatus === "gameOver") {
      setImoji(IMOJI.DEAD);
    } else if (gameStatus === "victory") {
      setImoji(IMOJI.PARTY);
    } else {
      setImoji(IMOJI.CHILL);
    }
  }, [gameStatus]);

  const onContextMenu = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
    e.preventDefault();

  const onMouseDown = () => {
    if (gameStatus === "ready" || gameStatus === "playing")
      setImoji(IMOJI.NERVOUS);
  };

  const onMouseUp = () => {
    if (gameStatus === "ready" || gameStatus === "playing")
      setImoji(IMOJI.CHILL);
  };

  return {
    imoji,
    mouseEventHandlers: { onMouseDown, onMouseUp, onContextMenu },
  };
};
