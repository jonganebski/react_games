import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLeaderboard } from "hooks/useLeaderboard";
import { useNotes } from "hooks/sudoku/useNotes";
import { usePopup } from "hooks/usePopup";
import { useTemplate } from "hooks/sudoku/useTemplate";
import { useTimer } from "hooks/useTimer";
import Box from "components/Sudoku/Box";
import SudokuBtn from "components/Sudoku/Button";
import Instructions from "components/Sudoku/Instructions";
import Leaderboard from "components/LeaderBoard";
import NotesButton from "components/Sudoku/NotesButton";
import Popup from "components/Sudoku/Popup";
import Timer from "components/Sudoku/Timer";
import { SUDOKU_GET_URL } from "constants/sudoku";

interface IGridSectionProps {
  popup: boolean;
}

interface ISudokuTemplateProps {
  solved: boolean;
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
  const { leaderboard, setLeaderboard } = useLeaderboard(SUDOKU_GET_URL);
  const { popup, setPopup, handleSubmit } = usePopup(
    solved,
    leaderboard.result,
    setLeaderboard,
    time
  );

  return (
    <Wrapper>
      {popup.bool && !popup.submitted && (
        <Popup time={time} setPopup={setPopup} handleSubmit={handleSubmit} />
      )}

      <Left popup={popup.bool}>
        <Instructions />
      </Left>
      <Center popup={popup.bool}>
        <SudokuTemplate solved={solved}>
          {hotTemplate?.map((row, rowIdx) =>
            row.map((num, numIdx) => (
              <Box
                key={(rowIdx + 1) * (numIdx + 1)}
                rowIdx={rowIdx}
                numIdx={numIdx}
                num={num}
                coolTemplate={coolTemplate}
                hotTemplate={hotTemplate}
                setHotTemplate={setHotTemplate}
                notesOn={notesOn}
                solved={solved}
              />
            ))
          )}
        </SudokuTemplate>
        <TimerAndNotesBtn>
          <NotesButton notesOn={notesOn} setNotesOn={setNotesOn} />
          <Timer time={time}></Timer>
        </TimerAndNotesBtn>
      </Center>
      <Right popup={popup.bool}>
        <ButtonGroup>
          <SudokuBtn text={"NEW GAME"} onClick={startGame} />
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
