import Axios from "axios";
import { useEffect, useState } from "react";
import { processData } from "utils/globalUtils";
import { Record } from "types/global.types";

export const useLeaderboard = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [leaderboard, setLeaderboard] = useState<Record[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(url)
      .then((res) => {
        const data = processData(res.data);
        setLeaderboard(data);
        setError("");
      })
      .catch(() => {
        setError("😢 Sorry.. Loading failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setLeaderboard, url]);

  return {
    leaderboard: { isLoading, error, result: leaderboard },
    setLeaderboard,
  };
};
