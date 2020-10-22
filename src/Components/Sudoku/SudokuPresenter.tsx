import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handleKeyDown } from "../../utils/sudoku/eventHandlers";
import {
  handleBoxBorderRight,
  handleBoxBorderTop,
  handleInputColor,
  handleInputFontWeight,
} from "../../utils/sudoku/styleHandlers";
import { startGame, validator } from "../../utils/sudoku/utils";
import Timer from "./Timer";
import SudokuBtn from "./Button";
import Instructions from "./Instructions";
import NotesButton from "./NotesButton";
import { TLeaderboard, TPopup } from "../../@types/sudoku";
import Leaderboard from "./Leaderboard";
import Popup from "./Popup";

// --------------- INTERFACES ---------------

interface ISudokuPresenterProps {
  solved: boolean;
  hotTemplate: number[][] | null;
  coolTemplate: React.MutableRefObject<number[][]>;
  setCurrentBox: React.Dispatch<React.SetStateAction<string>>;
  notesOn: boolean;
  currentBox: string;
  setHotTemplate: React.Dispatch<React.SetStateAction<number[][] | null>>;
  setNotesOn: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  startedAt: React.MutableRefObject<number>;
  leaderboard: TLeaderboard[];
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboard[]>>;
  popup: TPopup;
  setPopup: React.Dispatch<React.SetStateAction<TPopup>>;
}

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
  /* height: 60%; */
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

// --------------- MAIN COMPONENT ---------------

const SudokuPresenter: React.FC<ISudokuPresenterProps> = ({
  solved,
  hotTemplate,
  coolTemplate,
  setCurrentBox,
  notesOn,
  currentBox,
  setHotTemplate,
  setNotesOn,
  time,
  setTime,
  startedAt,
  leaderboard,
  setLeaderboard,
  popup,
  setPopup,
}) => (
  <Wrapper>
    {popup.bool && !popup.submitted && (
      <Popup
        time={time}
        leaderboard={leaderboard}
        setLeaderboard={setLeaderboard}
        popup={popup}
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
                          solved,
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
      <TimerAndNotesBtn>
        <NotesButton notesOn={notesOn} setNotesOn={setNotesOn} />
        <Timer
          time={time}
          setTime={setTime}
          startedAt={startedAt}
          solved={solved}
        ></Timer>
      </TimerAndNotesBtn>
    </Center>
    <Right popup={popup.bool}>
      <ButtonGroup>
        <SudokuBtn
          text={"NEW GAME"}
          onClick={() => {
            startGame(coolTemplate, setHotTemplate, setTime);
            startedAt.current = Date.now();
          }}
        />
        <Link to={"/"}>
          <SudokuBtn text="HOME" />
        </Link>
      </ButtonGroup>
      <Leaderboard leaderboard={leaderboard} setLeaderboard={setLeaderboard} />
    </Right>
  </Wrapper>
);

export default SudokuPresenter;
