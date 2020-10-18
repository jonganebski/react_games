import React, { useState } from "react";
import styled from "styled-components";
import { validator } from "../../utils/sudoku/utils";
// import { generateSudoku } from "../../utils/sudoku/utils";

const example: number[][] = [
  [7, 8, 0, 4, 0, 0, 1, 2, 0],
  [6, 0, 0, 0, 7, 5, 0, 0, 9],
  [0, 0, 0, 6, 0, 1, 0, 7, 8],
  [0, 0, 7, 0, 4, 0, 2, 6, 0],
  [0, 0, 1, 0, 5, 0, 9, 3, 0],
  [9, 0, 4, 0, 6, 0, 0, 0, 5],
  [0, 7, 0, 3, 0, 0, 0, 1, 2],
  [1, 2, 0, 0, 0, 7, 4, 0, 0],
  [0, 4, 9, 2, 0, 6, 0, 0, 7],
];

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: dimgray;
`;

const SudokuTemplate = styled.section`
  width: min-content;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  border: 1px solid black;
  background-color: black;
`;

const Box = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  font-size: 22px;
  border: 1px solid transparent;
  border-top: ${({ className }) => {
    if (className) {
      if (className.includes("row4") || className.includes("row7")) {
        return "1px solid black";
      }
    } else {
      return "none";
    }
  }};
  border-right: ${({ className }) => {
    if (className) {
      if (className.includes("column3") || className.includes("column6")) {
        return "1px solid black";
      }
    } else {
      return "none";
    }
  }};
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  font-weight: 600;
  color: #3182ce;
`;

const Sudoku = () => {
  return (
    <Wrapper>
      <SudokuTemplate>
        {example.map((row, rowIdx, arr) =>
          row.map((num, numIdx) => (
            <Box
              key={numIdx}
              className={`row${rowIdx + 1} column${numIdx + 1}`}
            >
              {num === 0 ? "" : num}
              {num === 0 && (
                <Input
                  type="text"
                  maxLength={5}
                  onChange={(e) => {
                    const value = Number(e.currentTarget.value);
                    if (isNaN(value)) {
                      e.currentTarget.value = "";
                    }
                    const isValid = validator(rowIdx, numIdx, value, arr);
                    if (isValid || e.currentTarget.value === "") {
                      console.log("OK");
                      e.currentTarget.style.color = "#3182ce";
                    } else {
                      console.log("NO");
                      e.currentTarget.style.color = "red";
                    }
                  }}
                ></Input>
              )}
            </Box>
          ))
        )}
      </SudokuTemplate>
    </Wrapper>
  );
};

export default Sudoku;
