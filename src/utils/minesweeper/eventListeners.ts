import { TBox, TMode, TOver, TStart } from "../../@types/minesweeper";
import {
  paintPressed,
  paintPressedAround,
  paintUnpressed,
  paintUnpressedAround,
  revealAround,
  revealChain,
  startGame,
} from "./utils";

let leftDown = false;
let rightDown = false;
let leftUp = false;
let rightUp = false;

// ------------- BOTH DOWN OR RESET -------------

const checkOrResetDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: number,
  mode: TMode,
  boxes: TBox
) => {
  if (leftDown && rightDown) {
    // BOTH DOWN
    paintPressed(e.currentTarget);
    paintPressedAround(mode, id, boxes);
  } else {
    // IF NOT BOTH DOWN, RESET
    setTimeout(() => {
      leftDown = false;
      rightDown = false;
    }, 200);
  }
};

// ------------- BOTH UP OR RESET -------------

const checkOrResetUp = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: number,
  newBoxes: TBox,
  mode: TMode
) => {
  if (leftUp && rightUp) {
    // BOTH UP
    paintUnpressed(e.currentTarget);
    paintUnpressedAround(mode, id, newBoxes);
    revealAround(mode, id, newBoxes);
  } else {
    // IF NOT BOTH UP, RESET
    setTimeout(() => {
      leftUp = false;
      rightUp = false;
    }, 300);
  }
};

// ------------- ON MOUSE ENTER -------------

export const handleMouseEnter = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  over: TOver,
  boxes: TBox
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // VARIABLES
  const id = e.currentTarget.parentElement?.id ?? "";
  // ENTER WITH LEFT CLICKED
  if (e.buttons === 1) {
    paintPressed(e.currentTarget);
  }
  // ENTER WITH BOTH CLICKED
  if (e.buttons === 3) {
    paintPressed(e.currentTarget);
    paintPressedAround(mode, parseInt(id), boxes);
  }
};

// ------------- ON MOUSE LEAVE -------------

export const handleMouseLeave = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  over: TOver,
  boxes: TBox
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // VARIABLES
  const id = e.currentTarget.parentElement?.id ?? "";
  // LEAVE WITH LEFT CLICKED
  if (e.buttons === 1) {
    paintUnpressed(e.currentTarget);
  }
  // LEAVE WITH BOTH CLICKED
  if (e.buttons === 3) {
    paintUnpressed(e.currentTarget);
    paintUnpressedAround(mode, parseInt(id), boxes);
  }
};

// ------------- ON MOUSE DOWN -------------

export const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  over: TOver,
  boxes: TBox
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool) {
    return;
  }
  // VARIABLES
  const id = e.currentTarget.parentElement?.id ?? "";
  // LEFT MOUSE DOWN
  if (e.button === 0) {
    leftDown = true;
    checkOrResetDown(e, parseInt(id), mode, boxes);
    return;
  }
  // RIGHT MOUSE DOWN
  if (e.button === 2) {
    rightDown = true;
    checkOrResetDown(e, parseInt(id), mode, boxes);
    return;
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
  // UPDATE
  setBoxes(newBoxes);
};

// ------------- ON CLICK -------------

export const handleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  boxes: TBox,
  start: TStart,
  over: TOver,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  setStart: React.Dispatch<React.SetStateAction<TStart>>
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool || e.buttons === 2) {
    return;
  }
  // VARIABLES
  const newBoxes: TBox = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  const box = newBoxes[parseInt(id)];
  // VALIDATION
  if (box.isFlaged || box.isQuestion) {
    return;
  }
  // START GAME
  if (!start.bool) {
    startGame(parseInt(id), mode, box, newBoxes, setStart);
  }
  // REVEAL & REVEAL CHAINING
  box.isRevealed = true;
  if (box.value === 0) {
    revealChain(mode, parseInt(id), boxes);
  }
  // UPDATE
  setBoxes(newBoxes);
};

// ------------- ON AUX CLICK -------------

export const handleAuxClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  boxes: TBox,
  over: TOver,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>
) => {
  e.preventDefault();
  // VALIDATION
  if (over.bool || e.buttons === 1) {
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
  // UPDATE
  setBoxes(newBoxes);
};

// ------------- ON MOUSE UP -------------

export const handleMouseUp = (
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
  const newBoxes = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  // MOUSE UP LEFT
  if (e.button === 0) {
    leftUp = true;
    checkOrResetUp(e, parseInt(id), newBoxes, mode);
    paintUnpressed(e.currentTarget);
    paintUnpressedAround(mode, parseInt(id), newBoxes);
  }
  // MOUSE UP RIGHT
  if (e.button === 2) {
    rightUp = true;
    checkOrResetUp(e, parseInt(id), newBoxes, mode);
    paintUnpressed(e.currentTarget);
    paintUnpressedAround(mode, parseInt(id), newBoxes);
  }
  // UPDATE
  setBoxes(newBoxes);
};
