import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { possibleNums } from "../../constants/sudoku";
import {
  generateSudoku,
  getNextXBox,
  getNextYBox,
  validator,
} from "../../utils/sudoku/utils";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const SudokuTemplate = styled.section`
  width: min-content;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  border: 1px solid black;
  background-color: black;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

interface IBoxProps {
  isValid?: boolean;
  isFixed?: boolean;
}

const Box = styled.div<IBoxProps>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: ${(props) => (props.isFixed ? "whitesmoke" : "white")};
  cursor: pointer;
  font-size: 22px;
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

const Input = styled.input<IBoxProps>`
  all: unset;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 10;
  font-weight: ${(props) => {
    const { isValid, isFixed } = props;
    if (isFixed && isValid) {
      return "normal";
    } else {
      return "600";
    }
  }};
  color: ${(props) => {
    const { isValid, isFixed } = props;
    if (isFixed && isValid) {
      return "black";
    }
    if (isValid) {
      return "#3182ce";
    }
    return "red";
  }};
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

interface INotesBtnProps {
  notesOn: boolean;
}
const NotesBtn = styled.div<INotesBtnProps>`
  width: 200px;
  height: 50px;
  box-sizing: content-box;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  &:hover {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      3px 6.7px 5.3px rgba(0, 0, 0, 0.048), 5px 12.5px 10px rgba(0, 0, 0, 0.1),
      10px 22.3px 17.9px rgba(0, 0, 0, 0.09),
      20px 30.8px 20.4px rgba(0, 0, 0, 0.03);
  }
`;

const NotesBtnTextContainer = styled.div<INotesBtnProps>`
  width: 100%;
  height: 300%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.22s ease-in-out;
  transform: ${(props) =>
    props.notesOn ? "translateY(-66px)" : "translateY(66px)"};
`;

const NotesBtnText = styled.span``;

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  rowIdx: number,
  numIdx: number,
  notesOn: boolean,
  currentBox: string,
  isFixed: boolean,
  hotTemplate: number[][],
  setHotTemplate: React.Dispatch<React.SetStateAction<number[][] | null>>
) => {
  const { key } = e;
  if (key === "ArrowRight") {
    getNextXBox(rowIdx, numIdx, "right")?.focus();
    return;
  }
  if (key === "ArrowLeft") {
    getNextXBox(rowIdx, numIdx, "left")?.focus();
    return;
  }
  if (key === "ArrowUp") {
    getNextYBox(rowIdx, numIdx, "up")?.focus();
    return;
  }
  if (key === "ArrowDown") {
    getNextYBox(rowIdx, numIdx, "down")?.focus();
    return;
  }
  if (isFixed) {
    return;
  }
  if (notesOn) {
    const note = document.getElementById(`note-${currentBox}-${key}`);
    if (note) {
      if (note.innerText === "") {
        note.innerText = key;
      } else {
        note.innerText = "";
      }
    }
  }
  if (!notesOn) {
    const newTemplate = JSON.parse(JSON.stringify(hotTemplate));
    if (possibleNums.includes(key)) {
      newTemplate[rowIdx].splice(numIdx, 1, parseInt(key));
    } else {
      newTemplate[rowIdx].splice(numIdx, 1, 0);
    }
    setHotTemplate(newTemplate);
  }
};

const Sudoku = () => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const [notesOn, setNotesOn] = useState(false);
  const [currentBox, setCurrentBox] = useState("");
  const coolTemplate = useRef<number[][]>([]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setNotesOn((prev) => !prev);
      }
    };
    generateSudoku().then((initialTemplate) => {
      coolTemplate.current = initialTemplate;
      setHotTemplate(initialTemplate);
    });
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
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
        {hotTemplate?.map((row, rowIdx) =>
          row.map((num, numIdx) => {
            const isValid = validator(rowIdx, numIdx, num, hotTemplate);
            const isFixed = coolTemplate.current[rowIdx][numIdx] !== 0;
            return (
              <Box
                key={(rowIdx + 1) * (numIdx + 1)}
                className={`row${rowIdx + 1} column${numIdx + 1}`}
                isFixed={isFixed}
              >
                {
                  <InputsContainer>
                    <Input
                      type="text"
                      id={`row${rowIdx + 1} column${numIdx + 1}`}
                      isValid={num === 0 ? true : isValid}
                      isFixed={isFixed}
                      value={num === 0 ? "" : num}
                      readOnly={true}
                      maxLength={1}
                      onFocus={() => setCurrentBox(`${rowIdx}-${numIdx}`)}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          rowIdx,
                          numIdx,
                          notesOn,
                          currentBox,
                          isFixed,
                          hotTemplate,
                          setHotTemplate
                        )
                      }
                    ></Input>
                    {
                      <Notes>
                        {Array.from(Array(9).keys()).map((n, i) => {
                          return (
                            <Note
                              key={i}
                              id={`note-${rowIdx}-${numIdx}-${n + 1}`}
                            ></Note>
                          );
                        })}
                      </Notes>
                    }
                  </InputsContainer>
                }
              </Box>
            );
          })
        )}
      </SudokuTemplate>

      <NotesBtn notesOn={notesOn} onClick={() => setNotesOn(!notesOn)}>
        <NotesBtnTextContainer notesOn={notesOn}>
          <NotesBtnText>Notes OFF</NotesBtnText>
          <NotesBtnText style={{ color: "red" }}>
            <span role="img" aria-label="imoji">
              📝
            </span>{" "}
            Notes ON
          </NotesBtnText>
        </NotesBtnTextContainer>
      </NotesBtn>
    </Wrapper>
  );
};

export default Sudoku;
