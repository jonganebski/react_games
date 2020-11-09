import React from "react";
import styled from "styled-components";
import { TLeaderboard } from "../../@types/global";
import { ranks } from "constants/global";
import { sortLBDescend } from "utils/globalUtils";

// ------------- INTERFACES -------------

interface ILeaderboardProps {
  leaderboard: TLeaderboard;
}

// ------------- STYLED COMPONENTS -------------

const List = styled.ul`
  width: 100%;
  max-width: 300px;
  padding: 10px;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  color: #099fff;
  &:hover {
    color: #ff5709;
  }
`;

// ------------- MAIN COMPONENT -------------

const Leaderboard: React.FC<ILeaderboardProps> = ({ leaderboard }) => {
  return (
    <List>
      {leaderboard.sort(sortLBDescend).map((leader, i) => (
        <Li key={i}>
          <span>
            {ranks[i]} {leader[0]}
          </span>
          <span>{leader[1]}</span>
        </Li>
      ))}
    </List>
  );
};

export default Leaderboard;
