import React from "react";
import styled from "styled-components";
import { TLeaderboard } from "../../@types/global";

const Wrapper = styled.div`
  width: 200px;
  min-height: 200px;
  border: 1px solid gray;
`;

interface ILeaderboardProps {
  leaderboard: TLeaderboard;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({ leaderboard }) => {
  return <Wrapper></Wrapper>;
};

export default Leaderboard;
