import { CELL_BORDER } from "constants/newMinesweeper";
import { Difficulty } from "interfaces/newMinesweeper";
import React from "react";
import styled, { keyframes } from "styled-components";
import { timeToString } from "utils/globalUtils";

interface FieldHeaderProps {
  difficulty: Difficulty;
  imoji: string;
  time: number;
  gameReady: (difficulty: Difficulty) => void;
  flagCount: number;
}

const Container = styled.header`
  position: relative;
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: silver;
  border-top: ${CELL_BORDER.STANDARD.TOP};
  border-right: ${CELL_BORDER.STANDARD.RIGHT};
  border-bottom: ${CELL_BORDER.STANDARD.BOTTOM};
  border-left: ${CELL_BORDER.STANDARD.LEFT};
`;

const rotate = keyframes`
from {transform: rotate(0deg)}
to {transform: rotate(360deg)}
`;

const PlayerImoji = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 15px;
  background-color: silver;
  border-top: ${CELL_BORDER.STANDARD.TOP};
  border-right: ${CELL_BORDER.STANDARD.RIGHT};
  border-bottom: ${CELL_BORDER.STANDARD.BOTTOM};
  border-left: ${CELL_BORDER.STANDARD.LEFT};
  cursor: pointer;
  &:active {
    border-top: ${CELL_BORDER.ON_DOWN.TOP};
    border-right: ${CELL_BORDER.ON_DOWN.RIGHT};
    border-bottom: ${CELL_BORDER.ON_DOWN.BOTTOM};
    border-left: ${CELL_BORDER.ON_DOWN.LEFT};
  }
  &:hover span {
    animation: ${rotate} 0.5s linear infinite;
  }
`;

const Count = styled.div`
  margin: 0px 10px 0px 10px;
  padding: 3px 5px 3px 5px;
  background-color: black;
  color: red;
  font-family: "Press Start 2P", cursive;
`;

const FieldHeader: React.FC<FieldHeaderProps> = ({
  difficulty,
  imoji,
  time,
  gameReady,
  flagCount,
}) => {
  return (
    <Container>
      <Count>
        {(difficulty.totalMines - flagCount).toString().padStart(3, "0")}
      </Count>
      <PlayerImoji onClick={() => gameReady(difficulty)}>
        <span role="img" aria-label="player imoji">
          {imoji}
        </span>
      </PlayerImoji>
      <Count>{timeToString(time).substring(0, 5)}</Count>
    </Container>
  );
};

export default FieldHeader;
