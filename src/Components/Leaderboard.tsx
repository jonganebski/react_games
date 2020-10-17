import Axios from "axios";
import React, { useEffect } from "react";
import { TLeaderboards, TMode } from "../@types/minesweeper";
import { easy, midd } from "../constants/minesweeper";
import { timeToString } from "../utils/globalUtils";
import { processData } from "../utils/minesweeper/utils";

interface ILeaderboardProps {
  mode: TMode;
  leaderboard: TLeaderboards | null;
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboards | null>>;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({
  mode,
  leaderboard,
  setLeaderboard,
}) => {
  useEffect(() => {
    Axios.get("http://localhost:4000/api/minesweeper/leaderboard").then(
      (res) => {
        const easy = processData(res.data.easy);
        const midd = processData(res.data.midd);
        const hard = processData(res.data.hard);
        setLeaderboard({ easy, midd, hard });
      }
    );
  }, [setLeaderboard]);

  let currentBoard;
  if (leaderboard) {
    if (mode.level === easy.level) {
      currentBoard = leaderboard.easy;
    } else if (mode.level === midd.level) {
      currentBoard = leaderboard.midd;
    } else {
      currentBoard = leaderboard.hard;
    }
  }

  return (
    <ol>
      {currentBoard?.map((set, i) => (
        <li key={i}>
          {i + 1} {set.name}: {timeToString(parseInt(set.time))}
        </li>
      ))}
    </ol>
  );
};

export default Leaderboard;
