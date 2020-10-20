import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { possibleNums } from "../../constants/sudoku";
import { generateSudoku, validator } from "../../utils/sudoku/utils";

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

interface IBoxProps {
  isValid: boolean;
}
interface IInputProps {
  isValid: boolean;
}

const Box = styled.div<IBoxProps>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: whitesmoke;
  font-size: 22px;
  font-weight: ${(props) => (props.isValid ? "normal" : "600")};
  color: ${(props) => (props.isValid ? "black" : "red")};
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

const InputsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Input = styled.input<IInputProps>`
  all: unset;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  font-weight: 600;
  z-index: 10;
  color: ${(props) => (props.isValid ? "#3182ce" : "red")};
  &:focus {
    background-color: #ebf8ff;
  }
`;

const Notes = styled.div`
  all: unset;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Note = styled.div`
  all: unset;
  font-size: 12px;
  text-align: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Sudoku = () => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const [notesOn, setNotesOn] = useState(false);
  const [currentBox, setCurrentBox] = useState("");
  const coolTemplate = useRef<number[][] | null>(null);

  useEffect(() => {
    generateSudoku().then((initialTemplate) => {
      coolTemplate.current = initialTemplate;
      setHotTemplate(initialTemplate);
    });
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
              return (
                <Box
                  key={(rowIdx + 1) * (numIdx + 1)}
                  className={`row${rowIdx + 1} column${numIdx + 1}`}
                  isValid={num === 0 ? true : isValid}
                >
                  {coolTemplate.current &&
                    coolTemplate.current[rowIdx][numIdx] !== 0 &&
                    num}
                  {coolTemplate.current &&
                    coolTemplate.current[rowIdx][numIdx] === 0 && (
                      <InputsContainer>
                        <Input
                          type="text"
                          isValid={num === 0 ? true : isValid}
                          value={num === 0 ? "" : num}
                          readOnly={true}
                          maxLength={1}
                          onFocus={() => setCurrentBox(`${rowIdx}-${numIdx}`)}
                          onKeyDown={(e) => {
                            const { key } = e;
                            if (notesOn) {
                              const note = document.getElementById(
                                `note-${currentBox}-${key}`
                              );
                              if (note) {
                                if (note.innerText === "") {
                                  note.innerText = key;
                                } else {
                                  note.innerText = "";
                                }
                              }
                            } else {
                              const newTemplate = JSON.parse(
                                JSON.stringify(hotTemplate)
                              );
                              if (possibleNums.includes(key)) {
                                newTemplate[rowIdx].splice(
                                  numIdx,
                                  1,
                                  parseInt(key)
                                );
                              } else {
                                newTemplate[rowIdx].splice(numIdx, 1, 0);
                              }
                              setHotTemplate(newTemplate);
                            }
                          }}
                        ></Input>
                        {
                          <Notes>
                            {Array.from(Array(9).keys()).map((n, i) => {
                              return (
                                <Note
                                  key={i}
                                  id={`note-${rowIdx}-${numIdx}-${n + 1}`}
                                  onFocus={() => {
                                    console.log("!");
                                  }}
                                  onKeyDown={(e) => {
                                    console.log(e.currentTarget.innerText);
                                  }}
                                >
                                  {/* {n + 1} */}
                                </Note>
                              );
                            })}
                          </Notes>
                        }
                      </InputsContainer>
                    )}
                </Box>
              );
            })
          )}
      </SudokuTemplate>
      <button
        onClick={() => {
          setNotesOn(!notesOn);
        }}
      >
        {notesOn ? "Notes on" : "Notes off"}
      </button>
    </Wrapper>
  );
};

export default Sudoku;
