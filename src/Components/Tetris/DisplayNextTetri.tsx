import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TMatrix, TTetriminos } from "../../@types/tetris";
import { CELL_HEIGHT, CELL_WIDTH } from "../../constants/tetris";
import { createMatrix } from "../../utils/Tetris/utils";
import { Cell } from "./Tetris";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, ${CELL_WIDTH}px);
  grid-template-rows: repeat(6, ${CELL_HEIGHT}px);
`;

interface IDisplayNextTetriProps {
  nextTetri: TTetriminos;
}

const DisplayNextTetri: React.FC<IDisplayNextTetriProps> = ({ nextTetri }) => {
  const [smallMatrix, setSmallMatrix] = useState(createMatrix(6, 6));

  useEffect(() => {
    const updateMatrix = (matrix: TMatrix): TMatrix => {
      // Clear acting tetrimino
      const newMatrix = matrix.map((row) =>
        row.map((cell) => (cell[1] === "free" ? [".", "free"] : cell))
      );
      // Deploy acting tetrimino with new position
      nextTetri.shape.forEach((row, y) =>
        row.forEach((value, x) => {
          if (value === "S" || value === "Z" || value === "I") {
            const rowIdx = 1 + y;
            const colIdx = 2 + x;
            const status = "free";
            newMatrix[rowIdx][colIdx] = [value, status];
          } else if (value !== ".") {
            const rowIdx = 2 + y;
            const colIdx = 2 + x;
            const status = "free";
            newMatrix[rowIdx][colIdx] = [value, status];
          }
        })
      );
      return newMatrix;
    };
    setSmallMatrix((prev) => updateMatrix(prev));
  }, [nextTetri.pos.x, nextTetri.pos.y, nextTetri.shape]);

  return (
    <Wrapper>
      {smallMatrix.map((row) =>
        row.map((cell, i) => (
          <Cell key={i} type={cell[0]} borderW="15px"></Cell>
        ))
      )}
    </Wrapper>
  );
};

export default DisplayNextTetri;
