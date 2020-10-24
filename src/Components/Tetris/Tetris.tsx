import React, { useState } from "react";
import styled, { StyledProps } from "styled-components";
import {
  MATRIX_W,
  CELL_WIDTH,
  MATRIX_H,
  CELL_HEIGHT,
  CELL_RGB,
} from "../../constants/tetris";
import { useGameStatus } from "../../hooks/tetris/useGameStatus";
import { useInterval } from "../../hooks/tetris/useInterval";
import { useMatrix } from "../../hooks/tetris/useMatrix";
import { useTetriminos } from "../../hooks/tetris/useTetriminos";
import { checkWillCollide, createMatrix } from "../../utils/Tetris/utils";
import TetrisButton from "./Button";
import DisplayNextTetri from "./DisplayNextTetri";
import DisplayStatus from "./DisplayStatus";
import Leaderboard from "./Leaderboard";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Left = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Center = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Right = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Matrix = styled.div`
  display: grid;
  grid-template-columns: repeat(${MATRIX_W}, ${CELL_WIDTH});
  grid-template-rows: repeat(${MATRIX_H}, ${CELL_HEIGHT});
  grid-gap: 1px;
  box-sizing: content-box;
  border: 2px solid black;
  background-color: rgb(20, 20, 20);
`;

interface ICellProps {
  type: string;
  borderW: string;
}

export const Cell = styled.div<ICellProps>`
  background-color: rgba(${(props) => CELL_RGB[props.type]}, 0.7);
  border: ${(props) =>
    props.type === "." ? "none" : `${props.borderW} solid`};
  border-top-color: rgba(${(props) => CELL_RGB[props.type]}, 1);
  border-right-color: rgba(${(props) => CELL_RGB[props.type]}, 0.6);
  border-bottom-color: rgba(${(props) => CELL_RGB[props.type]}, 0.3);
  border-left-color: rgba(${(props) => CELL_RGB[props.type]}, 0);
`;

const Tetris = () => {
  const [gameOver, setGameOver] = useState(false);
  const [dropInterval, setDropInterval] = useState<number | null>(null);

  const [tetri, setTetri, resetTetri, updateTetri, rotate] = useTetriminos();
  const [matrix, setMatrix, countCleared] = useMatrix(tetri, resetTetri);
  const [
    countTotalCleared,
    setCountTotalCleared,
    level,
    setLevel,
    score,
    setScore,
  ] = useGameStatus(countCleared);

  const startGame = () => {
    setMatrix(createMatrix(MATRIX_H, MATRIX_W));
    resetTetri();
    setDropInterval(1000);
    setLevel(1);
    setScore(0);
    setCountTotalCleared(0);
    setGameOver(false);
  };

  const drop = () => {
    if (countTotalCleared > level * 10) {
      setLevel((prev) => prev + 1);
      setDropInterval(1000 / level + 200);
    }
    const willCollide = checkWillCollide(matrix, tetri, 0, 1);
    if (willCollide) {
      if (tetri.pos.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropInterval(null);
      }
      updateTetri(0, 0, true);
    } else {
      updateTetri(0, 1, false);
    }
  };

  const moveHorizontal = (dir: number) => {
    const willCollide = checkWillCollide(matrix, tetri, dir, 0);
    if (willCollide) {
      return;
    } else {
      updateTetri(dir, 0, false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        moveHorizontal(-1);
      }
      if (e.key === "ArrowRight") {
        moveHorizontal(1);
      }
      if (e.key === "ArrowDown") {
        setDropInterval(null);
        drop();
      }
      if (e.key === "ArrowUp") {
        rotate(matrix);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      e.preventDefault();
      if (e.key === "ArrowDown") {
        setDropInterval(1000 / level + 200);
      }
    }
  };

  useInterval(() => drop(), dropInterval);

  console.log("re-render");

  return (
    <Wrapper
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Left>
        <Leaderboard />
      </Left>
      <Center>
        <Matrix>
          {matrix.map((row) =>
            row.map(([type], i) => (
              <Cell key={i} type={type} borderW="15px"></Cell>
            ))
          )}
        </Matrix>
      </Center>
      <Right>
        <DisplayNextTetri />
        <DisplayStatus title="Level" number={level} />
        <DisplayStatus title="Score" number={score} />
        <TetrisButton text="START GAME" onClick={startGame} />
        <TetrisButton text="HOME" />
      </Right>
    </Wrapper>
  );
};

export default Tetris;
