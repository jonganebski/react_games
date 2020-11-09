import Axios from "axios";
import { useEffect, useState } from "react";
import { TLeaderboard } from "../../@types/global";
import { SUDOKU_GET_URL } from "constants/sudoku";
import { processData } from "utils/globalUtils";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<TLeaderboard>([]);
  useEffect(() => {
    Axios.get(SUDOKU_GET_URL).then((res) => {
      const data = processData(res.data);
      setLeaderboard(data);
    });
  }, [setLeaderboard]);

  return { leaderboard, setLeaderboard };
};
