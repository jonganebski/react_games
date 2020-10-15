import { TBox, TMode, TOver, TStart } from "../../@types/minesweeper";
import {
  getBoxesAround,
  paintPressed,
  paintUnpressed,
  revealAround,
  revealChain,
  startGame,
} from "./utils";

let isDragging = false;

// ------------- ON MOUSE ENTER -------------

export const handleMouseEnter = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  over: TOver
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // ENTER WITH LEFT CLICKED
  if (e.buttons === 1) {
    isDragging = true;
    paintPressed(e);
  }
  // ENTER WITH BOTH CLICKED
  if (e.buttons === 3) {
  }
};

// ------------- ON MOUSE LEAVE -------------

export const handleMouseLeave = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  over: TOver
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // LEAVE WITH LEFT CLICKED
  if (e.buttons === 1) {
    paintUnpressed(e);
  }
  // LEAVE WITH BOTH CLICKED
  if (e.buttons === 3) {
  }
};

// ------------- ON MOUSE DOWN -------------

export const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  over: TOver
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // LEFT MOUSE DOWN
  if (e.buttons === 1) {
    paintPressed(e);
  }
  // BOTH MOUSE DOWN
  if (e.buttons === 3) {
  }
};

// ------------- ON DOUBLE CLICK -------------

export const handleDoubleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  boxes: TBox,
  over: TOver,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // VARIABLES
  const newBoxes: TBox = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  const box = newBoxes[parseInt(id)];
  // VALIDATION
  if (!box.isRevealed || box.isFlaged || box.isQuestion) {
    return;
  }
  // REVEAL AROUND
  revealAround(mode, parseInt(id), newBoxes);
  setBoxes(newBoxes);
};

// ------------- ON CLICK -------------

export const handleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  boxes: TBox,
  over: TOver,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  setOver: React.Dispatch<React.SetStateAction<TOver>>
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  console.log("click: ");
  // VARIABLES
  const newBoxes: TBox = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  const box = newBoxes[parseInt(id)];
  // VALIDATION
  if (box.isFlaged || box.isQuestion) {
    return;
  }
  // REVEAL & REVEAL CHAINING
  box.isRevealed = true;
  if (box.value === 0) {
    revealChain(mode, parseInt(id), newBoxes);
  }
  setBoxes(newBoxes);
};

// ------------- ON CONTEXT MENU -------------

export const handleContextMenu = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  boxes: TBox,
  over: TOver,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // VARIABLES
  const newBoxes = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  const box = newBoxes[parseInt(id)];
  // VALIDATION
  if (box.isRevealed) {
    return;
  }
  // FLAG or QUESTION MARK or NOTHING
  if (!box.isFlaged && !box.isQuestion) {
    box.isFlaged = true;
  } else if (box.isFlaged && !box.isQuestion) {
    box.isFlaged = false;
    box.isQuestion = true;
  } else if (!box.isFlaged && box.isQuestion) {
    box.isQuestion = false;
  }
  setBoxes(newBoxes);
};

// ------------- ON MOUSE UP -------------

export const handleMouseUp = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  boxes: TBox,
  start: TStart,
  over: TOver,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  setStart: React.Dispatch<React.SetStateAction<TStart>>,
  setOver: React.Dispatch<React.SetStateAction<TOver>>
) => {
  e.preventDefault();
  console.log("mouseup button", e.button);
  console.log("mouseup buttons", e.buttons);
  // VALIDATION
  if (over.bool) {
    return;
  }
  // VARIABLES
  const newBoxes = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  const box = newBoxes[parseInt(id)];
  // MOUSE UP LEFT
  if (e.button === 0) {
    paintUnpressed(e);
    if (!start.bool) {
      startGame(parseInt(id), mode, box, newBoxes, setStart);
    }
  }
  // MOUSE UP BOTH
  if (e.buttons === 3) {
    revealAround(mode, parseInt(id), boxes);
  }
  isDragging = false;
  setBoxes(newBoxes);
};
