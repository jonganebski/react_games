import React, { useEffect, useRef, useState } from "react";
import { handleGlobalKeyDown } from "../../utils/sudoku/eventHandlers";
import { startGame, validator } from "../../utils/sudoku/utils";
import SudokuPresenter from "./SudokuPresenter";

// --------------- MAIN COMPONENT ---------------

const Sudoku = () => {
  const [hotTemplate, setHotTemplate] = useState<number[][] | null>(null);
  const [notesOn, setNotesOn] = useState(false);
  const [currentBox, setCurrentBox] = useState("");
  const [solved, setSolved] = useState(false);
  const coolTemplate = useRef<number[][]>([]);

  useEffect(() => {
    // START GAME
    startGame(coolTemplate, setHotTemplate);
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
      } else {
        setSolved(false);
      }
    }
  }, [hotTemplate]);

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
    />
  );
};

export default Sudoku;
