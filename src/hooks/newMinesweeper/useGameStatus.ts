import { GameEnv } from "../../@types/newMinsweeper";
import { useEffect, useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";

export const useGameStatus = (
  field: CellService[][] | null,
  deployMines: (startingRowIdx: number, startingColIdx: number) => void
) => {
  const [gameStatus, setGameStatus] = useState<GameEnv>("ready");

  const gameStart = (rowIdx: number, colIdx: number) =>
    setGameStatus((prev) => {
      if (prev === "ready") {
        deployMines(rowIdx, colIdx);
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
      console.log("You made it!");
    }
  }, [field]);

  return { gameStatus, gameStart, gameOver, victory };
};
