import React, { useEffect, useRef, useState } from "react";
import { TLeaderboard, TPopup } from "../../@types/sudoku";
import { handleGlobalKeyDown } from "../../utils/sudoku/eventHandlers";
import { startGame, validator } from "../../utils/sudoku/utils";
import SudokuPresenter from "./SudokuPresenter";

// --------------- MAIN COMPONENT ---------------

const Sudoku = () => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const [notesOn, setNotesOn] = useState(false);
  const [currentBox, setCurrentBox] = useState("");
  const [solved, setSolved] = useState(false);
  const [time, setTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState<TLeaderboard[]>([]);
  const [popup, setPopup] = useState<TPopup>({ bool: false, submitted: false });
  const coolTemplate = useRef<number[][]>([]);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    // START GAME
    startGame(coolTemplate, setHotTemplate, setTime);
    // GLOBAL EVENTLISTENER
    document.addEventListener("keydown", (e) =>
      handleGlobalKeyDown(e, setNotesOn)
    );
    return () =>
      document.removeEventListener("keydown", (e) =>
        handleGlobalKeyDown(e, setNotesOn)
      );
  }, []);

  useEffect(() => {
    // DETERMINES GAME FINISHED OR NOT
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
          setSolved(true);
        } else {
          console.log("Try again!");
        }
      }
    }
  }, [hotTemplate]);

  useEffect(() => {
    if (solved && !popup.submitted) {
      if (
        leaderboard.some((row) => time <= parseInt(row[1])) ||
        leaderboard.length < 10
      ) {
        setPopup({ bool: true, submitted: false });
      }
    }
  }, [leaderboard, popup.submitted, solved, time]);
  return (
    <SudokuPresenter
      solved={solved}
      hotTemplate={hotTemplate}
      coolTemplate={coolTemplate}
      setCurrentBox={setCurrentBox}
      notesOn={notesOn}
      currentBox={currentBox}
      setHotTemplate={setHotTemplate}
      setNotesOn={setNotesOn}
      time={time}
      setTime={setTime}
      startedAt={startedAt}
      leaderboard={leaderboard}
      setLeaderboard={setLeaderboard}
      popup={popup}
      setPopup={setPopup}
    />
  );
};

export default Sudoku;
