import Axios from "axios";
import React, { useEffect, useState } from "react";
import { TLeaderboards, TMode, TModeLeaderboard } from "../@types/minesweeper";
import { easy, midd } from "../constants/minesweeper";
import { timeToString } from "../utils/globalUtils";
import { processData } from "../utils/minesweeper/utils";
import styled from "styled-components";

interface ILeaderboardProps {
  mode: TMode;
  leaderboard: TLeaderboards | null;
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboards | null>>;
}

const ranks = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const List = styled.ul`
  min-width: 200px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Leaderboard: React.FC<ILeaderboardProps> = ({
  mode,
  leaderboard,
  setLeaderboard,
}) => {
  const [currentBoard, setCurrentBoard] = useState<TModeLeaderboard[] | null>(
    null
  );
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

  useEffect(() => {
    if (leaderboard) {
      if (mode.level === easy.level) {
        setCurrentBoard(leaderboard.easy);
      } else if (mode.level === midd.level) {
        setCurrentBoard(leaderboard.midd);
      } else {
        setCurrentBoard(leaderboard.hard);
      }
    }
  }, [leaderboard, mode]);

  return (
    <List>
      {currentBoard?.map((set, i) => (
        <Li key={i}>
          <div style={{ marginRight: "20px" }}>
            <span>{ranks[i]}</span> <span>{set.name}</span>{" "}
          </div>
          <span>{timeToString(parseInt(set.time))}</span>
        </Li>
      ))}
    </List>
  );
};

export default Leaderboard;
