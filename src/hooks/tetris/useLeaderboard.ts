import Axios from "axios";
import { useEffect, useState } from "react";
import { TLeaderboard } from "../../@types/global";
import { processData } from "../../utils/globalUtils";

export const useLeaderboard = (
  score: number,
  gameOver: boolean
): [
  TLeaderboard,
  React.Dispatch<React.SetStateAction<TLeaderboard>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [leaderboard, setLeaderboard] = useState<TLeaderboard>([]);
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    // Initial request for leaderboard.
    try {
      Axios.get("http://localhost:4000/api/tetris/leaderboard").then((res) =>
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
