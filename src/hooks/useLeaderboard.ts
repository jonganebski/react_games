import Axios from "axios";
import { useEffect, useState } from "react";
import { processData } from "utils/globalUtils";
import { Record } from "types/global.types";

export const useLeaderboard = (url: string) => {
  const [leaderboard, setLeaderboard] = useState<Record[]>([]);

  useEffect(() => {
    Axios.get(url).then((res) => {
      const data = processData(res.data);
      setLeaderboard(data);
    });
  }, [setLeaderboard, url]);

  return { leaderboard, setLeaderboard };
};
