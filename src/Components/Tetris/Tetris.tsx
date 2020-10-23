import React, { useState } from "react";
import styled from "styled-components";
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

  const [tetri, setTetri, resetTetri, updateTetri] = useTetriminos();
  const [matrix, setMatrix] = useMatrix(tetri, resetTetri);

  const startGame = () => {
    setMatrix(createMatrix());
    resetTetri();
    setGameOver(false);
  };

  const drop = () => {
    const willCollide = checkWillCollide(matrix, tetri, 0, 1);
    if (!willCollide) {
      updateTetri(0, 1, false);
    } else {
      updateTetri(0, 0, true);
    }
  };

  const moveHorizontal = (dir: number) => {
    const willCollide = checkWillCollide(matrix, tetri, dir, 0);
    if (!willCollide) {
      updateTetri(dir, 0, false);
    }
  };

  const rotate = () =>
    setTetri((prev) => {
      const flippedOver = prev.shape.map((_, i) =>
        prev.shape.map((col) => col[i])
      );
      const rotatedClockwise = flippedOver.map((row) => row.reverse());
      return { ...prev, shape: rotatedClockwise };
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      moveHorizontal(-1);
    }
    if (e.key === "ArrowRight") {
      moveHorizontal(1);
    }
    if (e.key === "ArrowDown") {
      drop();
    }
    if (e.key === "ArrowUp") {
      rotate();
    }
  };

  return (
    <Wrapper role="button" tabIndex={0} onKeyDown={handleKeyDown}>
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
        <div>Next Tetrimino</div>
        <div>Score</div>
        <div>Level</div>
        <TetrisButton text="START GAME" onClick={startGame} />
        <TetrisButton text="HOME" />
      </Right>
    </Wrapper>
  );
};

export default Tetris;
