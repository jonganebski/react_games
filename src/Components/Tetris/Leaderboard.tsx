import React from "react";
import styled from "styled-components";
import { TLeader, TLeaderboard } from "../../@types/global";
import { ranks } from "../../constants/global";

const List = styled.ul`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  /* border: 1px solid gray; */
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

const sortFn = (a: TLeader, b: TLeader) => +b[1] - +a[1];

interface ILeaderboardProps {
  leaderboard: TLeaderboard;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({ leaderboard }) => {
  return (
    <List>
      {leaderboard.sort(sortFn).map((leader, i) => (
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
