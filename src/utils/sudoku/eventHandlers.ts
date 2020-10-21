import { possibleNums } from "../../constants/sudoku";
import { getNextXBox, getNextYBox } from "./utils";

export const handleKeyDown = (
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

export const handleGlobalKeyDown = (
  e: KeyboardEvent,
  setNotesOn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (e.code === "Space") {
    setNotesOn((prev) => !prev);
  }
};
