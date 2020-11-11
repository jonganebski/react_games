import { GameStatus } from "../../@types/newMinsweeper";
import { useEffect, useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";
import { useTimer } from "hooks/useTimer";

export const useGameStatus = (
  field: CellService[][] | null,
  deployMines: (startingRowIdx: number, startingColIdx: number) => void,
  setDummyField: () => void
) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("ready");
  const { time, setTime, startedAt } = useTimer(gameStatus !== "playing");

  const gameReady = () => {
    setGameStatus("ready");
    setTime(0);
    setDummyField();
  };

  const gameStart = (rowIdx: number, colIdx: number) =>
    setGameStatus((prev) => {
      if (prev === "ready") {
        deployMines(rowIdx, colIdx);
        startedAt.current = Date.now();
        return "playing";
      }
      return prev;
    });

  const gameOver = () => {
    field?.forEach((row) =>
      row.forEach((cell) => {
        if (cell.isMine && cell.status !== "flaged") {
          cell.changeStatus("reveal");
        }
      })
    );
    setGameStatus((prev) => {
      if (prev === "playing") {
        return "gameOver";
      }
      return prev;
    });
  };

  const victory = () =>
    setGameStatus((prev) => {
      if (prev === "playing") {
        return "victory";
      }
      return prev;
    });

  useEffect(() => {
    const isVictory = field?.every((row) =>
      row.every((cell) => {
        if (cell.isMine) {
          return cell.status === "flaged";
        } else {
          return cell.status !== "init";
        }
      })
    );
    if (isVictory) {
      victory();
      console.log("You made it!");
    }
  }, [field]);

  return { gameStatus, gameReady, gameStart, gameOver, time };
};
