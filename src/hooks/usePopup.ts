import Axios from "axios";
import { useEffect, useState } from "react";
import { processData } from "utils/globalUtils";
import { Record, TPopup } from "types/global.types";

export const usePopup = (
  solved: boolean,
  leaderboard: Record[],
  setLeaderboard: React.Dispatch<React.SetStateAction<Record[]>>,
  time: number
) => {
  const [popup, setPopup] = useState<TPopup>({ bool: false, submitted: false });

  useEffect(() => {
    if (solved && !popup.submitted) {
      if (
        leaderboard.some((row) => time <= parseInt(row[1])) ||
        leaderboard.length < 10
      ) {
        setPopup({ bool: true, submitted: false });
      }
    }
  }, [leaderboard, popup.submitted, solved, time]);

  const handleSubmit = (valid: boolean, url: string, value: string) => {
    if (valid) {
      Axios.post(url, {
        username: value,
        time,
      }).then((res) => {
        setLeaderboard(processData(res.data));
      });
      setPopup({ bool: false, submitted: true });
    }
  };

  return { popup, setPopup, handleSubmit };
};
