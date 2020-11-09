import { useState } from "react";
import { possibleNums } from "../../constants/sudoku";
import { validator, getNextXBox, getNextYBox } from "../../utils/sudoku/utils";

export const useBox = (
  rowIdx: number,
  numIdx: number,
  num: number,
  hotTemplate: number[][],
  coolTemplate: React.MutableRefObject<number[][]>,
  notesOn: boolean,
  solved: boolean,
  setHotTemplate: React.Dispatch<React.SetStateAction<number[][] | null>>
) => {
  const [currentBox, setCurrentBox] = useState("");
  const isValid = validator(rowIdx, numIdx, num, hotTemplate);
  const isFixed = coolTemplate.current[rowIdx][numIdx] !== 0;
  const indicator = `row${rowIdx + 1} column${numIdx + 1}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return { indicator, setCurrentBox, isFixed, isValid, handleKeyDown };
};
