import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const STAGE_WIDTH = 300;
const STAGE_HEIGHT = 500;

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

const THEATER_WIDTH = STAGE_WIDTH + CELL_WIDTH * 2;
const THEATER_HEIGHT = STAGE_HEIGHT;

const ROW_COUNT = THEATER_WIDTH / CELL_WIDTH;
const COLUMN_COUNT = THEATER_HEIGHT / CELL_HEIGHT;

const CELLS_COUNT = ROW_COUNT * COLUMN_COUNT;

interface ICellProps {
  num: number;
  tetrimino: number[];
}

const Theater = styled.div`
  margin: 100px 0 0 300px;
  width: ${THEATER_WIDTH}px;
  height: ${THEATER_HEIGHT}px;
  display: grid;
  grid-template-columns: ${`repeat(${
    THEATER_WIDTH / CELL_WIDTH
  }, ${CELL_WIDTH}px)`};
  background-color: black;
`;

const Cell = styled.div<ICellProps>`
  font-size: 10px;
  width: ${CELL_WIDTH}px;
  height: ${CELL_HEIGHT}px;
  background-color: ${({ num, tetrimino }) => {
    if (num % ROW_COUNT === 0 || num % ROW_COUNT === 1) {
      return "none";
    } else if (tetrimino.includes(num)) {
      return "red";
    } else {
      return "steelblue";
    }
  }};
`;

const theaterArr = Array.from(Array(CELLS_COUNT).keys()).map((key) => key + 1);
const pocketL = theaterArr.filter((num) => num % ROW_COUNT === 1);
const pocketR = theaterArr.filter((num) => num % ROW_COUNT === 0);

const getTetrimino = (n: number): { [key: string]: number[][] } => {
  return {
    I: [
      [n - 1, n, n + 1, n + 2],
      [n - ROW_COUNT, n, n + ROW_COUNT, n + ROW_COUNT * 2],
      [n - 1, n, n + 1, n + 2],
      [n - ROW_COUNT, n, n + ROW_COUNT, n + ROW_COUNT * 2],
    ],
    T: [
      [n, n - 1, n + 1, n - ROW_COUNT],
      [n, n - 1, n - ROW_COUNT, n + ROW_COUNT],
      [n, n - 1, n + 1, n + ROW_COUNT],
      [n, n + 1, n - ROW_COUNT, n + ROW_COUNT],
    ],
    O: [
      [n - 1, n, n - 1 - ROW_COUNT, n - ROW_COUNT],
      [n - 1, n, n - 1 - ROW_COUNT, n - ROW_COUNT],
      [n - 1, n, n - 1 - ROW_COUNT, n - ROW_COUNT],
      [n - 1, n, n - 1 - ROW_COUNT, n - ROW_COUNT],
    ],
    J: [
      [n, n + ROW_COUNT, n - 1 + ROW_COUNT, n - ROW_COUNT],
      [n, n - 1, n + 1, n - 1 - ROW_COUNT],
      [n, n + ROW_COUNT, n - ROW_COUNT, n + 1 - ROW_COUNT],
      [n, n - 1, n + 1, n + 1 + ROW_COUNT],
    ],
    L: [
      [n, n + ROW_COUNT, n + 1 + ROW_COUNT, n - ROW_COUNT],
      [n, n + 1, n - 1, n - 1 + ROW_COUNT],
      [n, n + ROW_COUNT, n - ROW_COUNT, n - 1 - ROW_COUNT],
      [n, n + 1, n - 1, n + 1 - ROW_COUNT],
    ],
    S: [
      [n, n - 1, n - ROW_COUNT, n - ROW_COUNT + 1],
      [n, n - 1, n + ROW_COUNT, n - ROW_COUNT - 1],
      [n, n - 1, n - ROW_COUNT, n - ROW_COUNT + 1],
      [n, n - 1, n + ROW_COUNT, n - ROW_COUNT - 1],
    ],
    Z: [
      [n, n + 1, n - ROW_COUNT, n - ROW_COUNT - 1],
      [n, n + 1, n + ROW_COUNT, n - ROW_COUNT + 1],
      [n, n + 1, n - ROW_COUNT, n - ROW_COUNT - 1],
      [n, n + 1, n + ROW_COUNT, n - ROW_COUNT + 1],
    ],
  };
};

const Tetris = () => {
  const [theater, setTheater] = useState(theaterArr);
  const [coord, setCoord] = useState(10);
  const [moveCount, setMoveCount] = useState(0);
  const [type, setType] = useState<"I" | "T" | "O" | "J" | "L" | "S" | "Z">(
    "I"
  ); // for dev
  const [tetrimino, setTetrimino] = useState(
    getTetrimino(coord)[type][moveCount]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowRight") {
        setCoord((prev) => prev + 1);
      }
      if (e.code === "ArrowLeft") {
        setCoord((prev) => prev - 1);
      }
      if (e.code === "ArrowDown") {
        setCoord((prev) => prev + ROW_COUNT);
      }
      if (e.code === "ArrowUp") {
        setMoveCount((prev) => (prev === 3 ? 0 : prev + 1));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {}, [tetrimino]);

  useEffect(() => {
    setTetrimino(getTetrimino(coord)[type][moveCount]);
  }, [coord, moveCount, type]);

  return (
    <>
      <Theater>
        {theater.map((num) => {
          return (
            <Cell key={num} num={num} tetrimino={tetrimino}>
              {num}
            </Cell>
          );
        })}
      </Theater>
      <button onClick={() => setType("I")}>I</button>
      <button onClick={() => setType("O")}>O</button>
      <button onClick={() => setType("T")}>T</button>
      <button onClick={() => setType("J")}>J</button>
      <button onClick={() => setType("L")}>L</button>
      <button onClick={() => setType("S")}>S</button>
      <button onClick={() => setType("Z")}>Z</button>
    </>
  );
};

export default Tetris;
