import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  CELL_HEIGHT,
  CELL_RGB,
  CELL_WIDTH,
  MATRIX_H,
  MATRIX_W,
} from "constants/tetris";
import { useGameStatus } from "hooks/tetris/useGameStatus";
import { useInterval } from "hooks/tetris/useInterval";
import { useLeaderboard } from "hooks/tetris/useLeaderboard";
import { useMatrix } from "hooks/tetris/useMatrix";
import { useTetriminos } from "hooks/tetris/useTetriminos";
import { checkWillCollide, createMatrix } from "utils/Tetris/utils";
import TetrisButton from "components/Tetris/Button";
import DisplayNextTetri from "components/Tetris/DisplayNextTetri";
import DisplayStatus from "components/Tetris/DisplayStatus";
import Leaderboard from "components/Tetris/Leaderboard";
import Popup from "components/Tetris/Popup";

// ------------- INTERFACES -------------

interface ICellProps {
  type: string;
  borderW: string;
}

// ------------- STYLED COMPONENTS -------------

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  z-index: 1;
`;

const Right = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
`;

const StatusContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Matrix = styled.div`
  display: grid;
  grid-template-columns: repeat(${MATRIX_W}, ${CELL_WIDTH}px);
  grid-template-rows: repeat(${MATRIX_H}, ${CELL_HEIGHT}px);
  grid-gap: 1px;
  box-sizing: content-box;
  border: 2px solid black;
  background-color: rgb(20, 20, 20);
  box-shadow: 0 0 10px #099fff, 0 0 40px #099fff, 0 0 80px #099fff;
`;

export const Cell = styled.div<ICellProps>`
  width: ${CELL_WIDTH}px;
  height: ${CELL_HEIGHT}px;
  background-color: rgba(${(props) => CELL_RGB[props.type]}, 0.7);
  border: ${(props) =>
    props.type === "." ? "none" : `${props.borderW} solid`};
  border-top-color: rgba(${(props) => CELL_RGB[props.type]}, 1);
  border-right-color: rgba(${(props) => CELL_RGB[props.type]}, 0.6);
  border-bottom-color: rgba(${(props) => CELL_RGB[props.type]}, 0.3);
  border-left-color: rgba(${(props) => CELL_RGB[props.type]}, 0);
`;

// ------------- MAIN COMPONENT -------------

const Tetris = () => {
  // HOOKS
  const [gameOver, setGameOver] = useState(false);
  const [dropInterval, setDropInterval] = useState<number | null>(null);
  const [tetri, nextTetri, resetTetri, updateTetri, rotate] = useTetriminos();
  const [matrix, setMatrix, countCleared] = useMatrix(tetri, resetTetri);
  const [
    countTotalCleared,
    setCountTotalCleared,
    level,
    setLevel,
    score,
    setScore,
  ] = useGameStatus(countCleared);
  const [
    leaderboard,
    setLeaderboard,
    isNewRecord,
    setIsNewRecord,
  ] = useLeaderboard(score, gameOver);

  // FUNCTIONS
  const startGame = () => {
    setMatrix(createMatrix(MATRIX_H, MATRIX_W));
    resetTetri();
    setDropInterval(1000);
    setLevel(1);
    setScore(0);
    setCountTotalCleared(0);
    setIsNewRecord(false);
    setGameOver(false);
  };

  const drop = (n: number) => {
    if (countTotalCleared > level * 10) {
      setLevel((prev) => prev + 1);
      setDropInterval(1000 / level + 200);
    }
    for (let l = n; l > 0; --l) {
      const willCollide = checkWillCollide(matrix, tetri, 0, l);
      if (!willCollide) {
        updateTetri(0, l, false);
        return;
      }
    }
    if (tetri.pos.y < 1) {
      console.log("GAME OVER");
      setGameOver(true);
      setDropInterval(null);
    }
    updateTetri(0, 0, true);
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
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveHorizontal(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveHorizontal(1);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setDropInterval(null);
        drop(1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        rotate(matrix);
      }
      if (e.key === " ") {
        e.preventDefault();
        drop(25);
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

  useInterval(() => drop(1), dropInterval);

  const UseMemoCell = (i: number, type: string) =>
    useMemo(() => {
      return <Cell key={i} type={type} borderW="15px"></Cell>;
    }, [i, type]);

  return (
    <Wrapper
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Popup
        isNewRecord={isNewRecord}
        gameOver={gameOver}
        score={score}
        setLeaderboard={setLeaderboard}
      />
      <Left>
        <Leaderboard leaderboard={leaderboard} />
      </Left>
      <Center>
        <Matrix>
          {matrix.map((row) => row.map(([type], i) => UseMemoCell(i, type)))}
        </Matrix>
      </Center>
      <Right>
        <StatusContainer>
          <DisplayNextTetri nextTetri={nextTetri} />
          <DisplayStatus title="Level" number={level} />
          <DisplayStatus title="Score" number={score} />
          <TetrisButton text="START GAME" onClick={startGame} />
          <Link to="/">
            <TetrisButton text="HOME" />
          </Link>
        </StatusContainer>
      </Right>
    </Wrapper>
  );
};

export default Tetris;
