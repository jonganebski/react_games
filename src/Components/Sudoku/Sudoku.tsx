import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { possibleNums } from "../../constants/sudoku";
import { useLeaderboard } from "../../hooks/sudoku/useLeaderboard";
import { useNotes } from "../../hooks/sudoku/useNotes";
import { usePopup } from "../../hooks/sudoku/usePopup";
import { useTemplate } from "../../hooks/sudoku/useTemplate";
import { useTimer } from "../../hooks/sudoku/useTimer";
import {
  handleBoxBorderRight,
  handleBoxBorderTop,
  handleInputColor,
  handleInputFontWeight,
} from "../../utils/sudoku/styleHandlers";
import { getNextXBox, getNextYBox, validator } from "../../utils/sudoku/utils";
import SudokuBtn from "./Button";
import Instructions from "./Instructions";
import Leaderboard from "./Leaderboard";
import NotesButton from "./NotesButton";
import Popup from "./Popup";
import Timer from "./Timer";

interface IGridSectionProps {
  popup: boolean;
}

interface ISudokuTemplateProps {
  solved: boolean;
}

export interface IBoxProps {
  isValid?: boolean;
  isFixed?: boolean;
}

// --------------- STYLED COMPONENTS ---------------

const Wrapper = styled.main`
  position: relative;
  max-height: 100vh;
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: white;
`;

const Left = styled.section<IGridSectionProps>`
  filter: ${({ popup }) => (popup ? "blur(2px)" : "blur(0px)")};
`;
const Center = styled.section<IGridSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: ${({ popup }) => (popup ? "blur(2px)" : "blur(0px)")};
`;
const Right = styled.section<IGridSectionProps>`
  padding-left: 50px;
  filter: ${({ popup }) => (popup ? "blur(2px)" : "blur(0px)")};
`;

const SudokuTemplate = styled.div<ISudokuTemplateProps>`
  width: min-content;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  border: 1px solid black;
  background-color: black;
  box-shadow: ${(props) =>
    props.solved
      ? "0 0 20px 1px rgba(36, 252, 3, 0.3), 0 0 12px 2px rgba(36, 252, 3, 0.2), 0 0 12px 10px rgba(36, 252, 3, 0.2),0 0 10px 17.9px rgba(36, 252, 3, 0.1),0 0 20px 33.4px rgba(36, 252, 3, 0.086);"
      : "0 0 20px 1px rgba(0, 0, 0, 0.3), 0 0 12px 2px rgba(0, 0, 0, 0.2), 0 0 12px 10px rgba(0, 0, 0, 0.2), 0 0 10px 17.9px rgba(0, 0, 0, 0.1), 0 0 20px 33.4px rgba(0, 0, 0, 0.086);"};
`;

const TimerAndNotesBtn = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

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
  border-top: ${({ className }) => handleBoxBorderTop(className)};
  border-right: ${({ className }) => handleBoxBorderRight(className)};
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
  font-weight: ${handleInputFontWeight};
  color: ${handleInputColor};
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

const ButtonGroup = styled.div`
  width: 60%;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

// --------------- MAIN COMPONENT ---------------

const Sudoku = () => {
  const [solved, setSolved] = useState(false);
  const { time, setTime, startedAt } = useTimer(solved);
  const { notesOn, setNotesOn } = useNotes();
  const { hotTemplate, setHotTemplate, coolTemplate, startGame } = useTemplate(
    setTime,
    setSolved,
    startedAt
  );
  const { leaderboard, setLeaderboard } = useLeaderboard();
  const { popup, setPopup } = usePopup(solved, leaderboard, time);
  const [currentBox, setCurrentBox] = useState("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIdx: number,
    numIdx: number,
    notesOn: boolean,
    currentBox: string,
    isFixed: boolean,
    solved: boolean,
    hotTemplate: number[][],
    setHotTemplate: React.Dispatch<React.SetStateAction<number[][] | null>>
  ) => {
    if (solved) {
      return;
    }
    const { key } = e;
    e.preventDefault();
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

  return (
    <Wrapper>
      {popup.bool && !popup.submitted && (
        <Popup
          time={time}
          setLeaderboard={setLeaderboard}
          setPopup={setPopup}
        />
      )}
      <Left popup={popup.bool}>
        <Instructions />
      </Left>
      <Center popup={popup.bool}>
        <SudokuTemplate solved={solved}>
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
                          solved,
                          hotTemplate,
                          setHotTemplate
                        )
                      }
                    ></Input>
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
                  </InputsContainer>
                </Box>
              );
            })
          )}
        </SudokuTemplate>
        <TimerAndNotesBtn>
          <NotesButton notesOn={notesOn} setNotesOn={setNotesOn} />
          <Timer time={time}></Timer>
        </TimerAndNotesBtn>
      </Center>
      <Right popup={popup.bool}>
        <ButtonGroup>
          <SudokuBtn
            text={"NEW GAME"}
            onClick={() => {
              startGame();
            }}
          />
          <Link to={"/"}>
            <SudokuBtn text="HOME" />
          </Link>
        </ButtonGroup>
        <Leaderboard leaderboard={leaderboard} />
      </Right>
    </Wrapper>
  );
};

export default Sudoku;
