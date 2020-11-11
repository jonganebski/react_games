import React from "react";
import styled from "styled-components";
import { Record } from "../types/global.types";
import { ranks } from "constants/global";
import { timeToString } from "utils/globalUtils";

const Wrapper = styled.div`
  max-width: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

interface ILeaderboardProps {
  leaderboard: Record[];
}

const Leaderboard: React.FC<ILeaderboardProps> = ({ leaderboard }) => {
  return (
    <Wrapper>
      <Heading>Best Players of the Month</Heading>
      <ul>
        {leaderboard.length === 0 ? (
          <Li>
            <span role="img" aria-label="nobody on leaderboard">
              😴 nobody's on the leaderboard
            </span>
          </Li>
        ) : (
          leaderboard.map((set, i) => {
            return (
              <Li key={i}>
                <div style={{ marginRight: "20px" }}>
                  <span>{ranks[i]}</span> <span>{set[0]}</span>{" "}
                </div>
                <span>{timeToString(parseInt(set[1]))}</span>
              </Li>
            );
          })
        )}
      </ul>
    </Wrapper>
  );
};

export default Leaderboard;
