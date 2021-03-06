import Axios from "axios";
import { useEffect, useState } from "react";
import { Record } from "types/global.types";
import { TETRIS_GET_URL } from "constants/tetris";
import { processData } from "utils/globalUtils";

export const useLeaderboard = (
  score: number,
  gameOver: boolean
): [
  Record[],
  React.Dispatch<React.SetStateAction<Record[]>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [leaderboard, setLeaderboard] = useState<Record[]>([]);
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    // Initial request for leaderboard.
    try {
      Axios.get(TETRIS_GET_URL).then((res) =>
        setLeaderboard(processData(res.data))
      );
    } catch {}
  }, []);

  useEffect(() => {
    // Determines the scores is new record or not.
    if (gameOver && score !== 0) {
      if (
        leaderboard.length < 10 ||
        leaderboard.some((leader) => parseInt(leader[1]) <= score)
      ) {
        setIsNewRecord(true);
      }
    }
  }, [gameOver, leaderboard, score]);

  return [leaderboard, setLeaderboard, isNewRecord, setIsNewRecord];
};
