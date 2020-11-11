import { GameStatus } from "../../@types/newMinsweeper";
import { useEffect, useState } from "react";
import { hard } from "constants/newMinesweeper";
import { Difficulty } from "interfaces/newMinesweeper";
import { useTimer } from "hooks/useTimer";
import { CellService } from "utils/newMinesweeper/utils";

export const useGameStatus = (
  field: CellService[][] | null,
  generateField: (
    difficulty: Difficulty,
    startingRowIdx: number | null,
    startingColIdx: number | null
  ) => void
) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("ready");
  const [difficulty, setDifficulty] = useState<Difficulty>(hard);
  const [flagCount, setFlagCount] = useState(0);
  const { time, setTime, startedAt } = useTimer(gameStatus !== "playing");

  const gameReady = (difficulty: Difficulty) => {
    setGameStatus("ready");
    setDifficulty(difficulty);
    setTime(0);
    setFlagCount(0);
    generateField(difficulty, null, null);
  };

  useEffect(() => {
    gameReady(difficulty);
  }, []);

  const gameStart = (rowIdx: number, colIdx: number) =>
    setGameStatus((prev) => {
      if (prev === "ready") {
        startedAt.current = Date.now();
        generateField(difficulty, rowIdx, colIdx);
        return "playing";
      }
      return prev;
    });

  const gameOver = () =>
    setGameStatus((prev) => {
      if (prev === "playing") {
        field?.forEach((row) =>
          row.forEach((cell) => {
            if (cell.isMine && cell.status !== "flaged") {
              cell.changeStatus("reveal");
            }
          })
        );
        return "gameOver";
      }
      return prev;
    });

  const victory = () =>
    setGameStatus((prev) => {
      if (prev === "playing") {
        return "victory";
      }
      return prev;
    });

  useEffect(() => {
    if (gameStatus === "playing" && field) {
      const flagCount = field.flat().filter((cell) => cell.status === "flaged")
        .length;
      setFlagCount(flagCount);
      const isVictory = field.every((row) =>
        row.every((cell) => {
          if (cell.isMine) {
            return cell.status === "flaged";
          } else {
            return cell.status === "revealed";
          }
        })
      );
      if (isVictory) {
        victory();
      }
    }
  }, [field, gameStatus]);
  return {
    difficulty,
    time,
    flagCount,
    gameStatus,
    gameReady,
    gameStart,
    gameOver,
  };
};
