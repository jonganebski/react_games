import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const FIELD_WIDTH = 300;
const FIELD_HEIGHT = 500;

const PIXEL_WIDTH = 20;
const PIXEL_HEIGHT = 20;

const TOTAL_ROWS = FIELD_HEIGHT / PIXEL_HEIGHT;
const TOTAL_COLUMNS = FIELD_WIDTH / PIXEL_WIDTH;

const Field = styled.div`
  margin: 100px 0 0 300px;
  width: ${FIELD_WIDTH}px;
  height: ${FIELD_HEIGHT}px;
  display: grid;
  grid-template-columns: ${`repeat(${
    FIELD_WIDTH / PIXEL_WIDTH
  }, ${PIXEL_WIDTH}px)`};
  background-color: steelblue;
`;

const Cell = styled.div`
  width: ${PIXEL_WIDTH}px;
  height: ${PIXEL_HEIGHT}px;
`;

type TFieldArr = {
  value: "." | "I" | "S";
  status: "clear" | "stack" | "active";
}[][];

const TETRIMINO = {
  I: {
    shape: [
      [
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
      ],
      [
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
      ],
      [
        { value: "I", status: "active" },
        { value: "I", status: "active" },
        { value: "I", status: "active" },
        { value: "I", status: "active" },
      ],
      [
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
        { value: ".", status: "clear" },
      ],
    ] as TFieldArr,
    color: "red",
  },
};

const rotate = (tetrimino: string[][]) => {
  const rotated: string[][] = [];
  for (let i = 0; i < tetrimino.length; i++) {
    const newRow: string[] = [];
    tetrimino.forEach((row) => newRow.push(row[i]));
    rotated.push(newRow.reverse());
  }
  return rotated;
};

const fieldArr: TFieldArr = Array(TOTAL_ROWS).fill(
  Array(TOTAL_COLUMNS).fill({ value: ".", status: "clear" })
);

const Tetris = () => {
  const [field, setField] = useState<TFieldArr>(fieldArr);
  const [tetrimino, setTetrimino] = useState<TFieldArr>(TETRIMINO.I.shape);
  const [xCoord, setXCoord] = useState(1);
  const [yCoord, setYCoord] = useState(4);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("?");
      if (e.code === "ArrowRight") {
        setXCoord((prev) => prev + 1);
      }
      if (e.code === "ArrowLeft") {
        setXCoord((prev) => prev - 1);
      }
      if (e.code === "ArrowDown") {
        setYCoord((prev) => prev + 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  console.log(xCoord);
  useEffect(() => {
    setField((prev) => {
      const field = JSON.parse(JSON.stringify(prev)) as TFieldArr;
      field.forEach((row) =>
        row.forEach((obj) => {
          if (obj.status === "active") {
            obj.value = ".";
            obj.status = "clear";
          }
        })
      );
      for (let i = 0; i < tetrimino.length; i++) {
        field[i + yCoord].splice(xCoord, tetrimino[i].length, ...tetrimino[i]);
      }
      return field;
    });
  }, [tetrimino, xCoord, yCoord]);

  return (
    <Field>
      {field.map((row, rowIdx) =>
        row.map((obj, cellIdx) => (
          <Cell
            key={`${rowIdx}-${cellIdx}`}
            style={{ backgroundColor: obj.value === "." ? "white" : "red" }}
          >
            {obj.value}
          </Cell>
        ))
      )}
    </Field>
  );
};

export default Tetris;
