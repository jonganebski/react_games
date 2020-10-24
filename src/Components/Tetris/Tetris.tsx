import React, { useState } from "react";
import styled from "styled-components";
import { useGameStatus } from "../../hooks/tetris/useGameStatus";
import { useInterval } from "../../hooks/tetris/useInterval";
import { useMatrix } from "../../hooks/tetris/useMatrix";
import { useTetriminos } from "../../hooks/tetris/useTetriminos";
import { checkWillCollide, createMatrix } from "../../utils/Tetris/utils";
import TetrisButton from "./Button";

const MATRIX_W = 10;
const MATRIX_H = 20;

const CELL_WIDTH = "20px";
const CELL_HEIGHT = "20px";

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
  background-color: tomato;
`;

const Center = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: steelblue;
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
  background-color: black;
`;

interface ICellProps {
  type: string;
}

const Cell = styled.div<ICellProps>`
  background-color: ${(props) => (props.type === "." ? "gray" : "red")};
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
    setMatrix(createMatrix());
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
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      setDropInterval(1000 / level + 200);
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
        <div>Leaderboard</div>
      </Left>
      <Center>
        <Matrix>
          {matrix.map((row) =>
            row.map(([type], i) => <Cell key={i} type={type}></Cell>)
          )}
        </Matrix>
      </Center>
      <Right>
        <div style={{ color: "white" }}>Level: {level}</div>
        <div style={{ color: "white" }}>Score: {score}</div>
        <div style={{ color: "white" }}>Lines Cleared: {countTotalCleared}</div>
        <TetrisButton text="START GAME" onClick={startGame} />
        <TetrisButton text="HOME" />
      </Right>
    </Wrapper>
  );
};

export default Tetris;
