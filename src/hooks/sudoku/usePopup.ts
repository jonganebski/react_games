import { useEffect, useState } from "react";
import { TLeaderboard } from "../../@types/global";
import { TPopup } from "../../@types/sudoku";

export const usePopup = (
  solved: boolean,
  leaderboard: TLeaderboard,
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

  return { popup, setPopup };
};
