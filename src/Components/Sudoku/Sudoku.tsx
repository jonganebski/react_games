import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { possibleNums } from "../../constants/sudoku";
import { generateSudoku, validator } from "../../utils/sudoku/utils";
// import { generateSudoku } from "../../utils/sudoku/utils";

// const coolTemplate: number[][] = [
//   [7, 8, 0, 4, 0, 0, 1, 2, 0],
//   [6, 0, 0, 0, 7, 5, 0, 0, 9],
//   [0, 0, 0, 6, 0, 1, 0, 7, 8],
//   [0, 0, 7, 0, 4, 0, 2, 6, 0],
//   [0, 0, 1, 0, 5, 0, 9, 3, 0],
//   [9, 0, 4, 0, 6, 0, 0, 0, 5],
//   [0, 7, 0, 3, 0, 0, 0, 1, 2],
//   [1, 2, 0, 0, 0, 7, 4, 0, 0],
//   [0, 4, 9, 2, 0, 6, 0, 0, 7],
// ];

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

interface IInputProps {
  isValid: boolean;
}

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

const Input = styled.input<IInputProps>`
  all: unset;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  font-weight: 600;
  color: ${(props) => (props.isValid ? "#3182ce" : "red")};
`;

const Sudoku = () => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const coolTemplate = useRef<number[][] | null>(null);

  useEffect(() => {
    generateSudoku();
    // generateSudoku().then((initialTemplate) => {
    //   coolTemplate.current = initialTemplate;
    //   setHotTemplate(initialTemplate);
    // });
  }, []);

  useEffect(() => {
    if (hotTemplate) {
      const allFilled = !hotTemplate?.some((row) =>
        row.some((num) => num === 0)
      );
      if (allFilled) {
        const correct = hotTemplate?.every((row, rowIdx) => {
          const rowValid = row.every((num, numIdx) => {
            const numValid = validator(rowIdx, numIdx, num, hotTemplate);
            return numValid;
          });
          return rowValid;
        });
        if (correct) {
          console.log("Congratulations!");
        } else {
          console.log("Try again!");
        }
      }
    }
  }, [hotTemplate]);

  return (
    <Wrapper>
      <SudokuTemplate>
        {hotTemplate &&
          hotTemplate.map((row, rowIdx) =>
            row.map((num, numIdx) => {
              const isValid = validator(rowIdx, numIdx, num, hotTemplate);
              // const isValid = true;
              return (
                <Box
                  key={(rowIdx + 1) * (numIdx + 1)}
                  className={`row${rowIdx + 1} column${numIdx + 1}`}
                >
                  {coolTemplate.current &&
                    coolTemplate.current[rowIdx][numIdx] !== 0 &&
                    num}
                  {coolTemplate.current &&
                    coolTemplate.current[rowIdx][numIdx] === 0 && (
                      <Input
                        type="text"
                        isValid={num === 0 ? true : isValid}
                        maxLength={1}
                        onChange={(e) => {
                          const { value } = e.currentTarget;
                          if (!possibleNums.includes(value)) {
                            e.currentTarget.value = "";
                            return;
                          }
                          const newTemplate = JSON.parse(
                            JSON.stringify(hotTemplate)
                          );
                          newTemplate[rowIdx].splice(
                            numIdx,
                            1,
                            value === "" ? 0 : parseInt(value)
                          );
                          setHotTemplate(newTemplate);
                        }}
                      ></Input>
                    )}
                </Box>
              );
            })
          )}
      </SudokuTemplate>
    </Wrapper>
  );
};

export default Sudoku;
