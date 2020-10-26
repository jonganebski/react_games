import Axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { TLeaderboard } from "../../@types/sudoku";
import { ranks } from "../../constants/global";
import { SUDOKU_GET_URL } from "../../constants/sudoku";
import { processData, timeToString } from "../../utils/globalUtils";

const List = styled.ul`
  max-width: 300px;
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

interface ILeaderboardProps {
  leaderboard: TLeaderboard[];
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboard[]>>;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({
  leaderboard,
  setLeaderboard,
}) => {
  useEffect(() => {
    Axios.get(SUDOKU_GET_URL).then((res) => {
      const data = processData(res.data);
      setLeaderboard(data);
    });
  }, [setLeaderboard]);

  return (
    <List>
      {leaderboard?.map((set, i) => (
        <Li key={i}>
          <div style={{ marginRight: "20px" }}>
            <span>{ranks[i]}</span> <span>{set[0]}</span>{" "}
          </div>
          <span>{timeToString(parseInt(set[1]))}</span>
        </Li>
      ))}
    </List>
  );
};

export default Leaderboard;
