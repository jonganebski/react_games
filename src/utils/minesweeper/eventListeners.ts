import { TBox, TMode } from "../../@types/minesweeper";
import {
  countMinesAround,
  getMinesIndex,
  paintPressed,
  paintPressedAround,
  paintUnpressed,
  paintUnpressedAround,
  revealAround,
  revealChain,
  startGame,
} from "utils/minesweeper/utils";

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
  paintPressed(e.currentTarget);
  if (leftDown && rightDown) {
    // BOTH DOWN
    paintPressedAround(mode, id, boxes);
  } else {
    // IF NOT BOTH DOWN, RESET
    setTimeout(() => {
      leftDown = false;
      rightDown = false;
    }, 20);
  }
};

// ------------- BOTH UP OR RESET -------------

const checkOrResetUp = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: number,
  newBoxes: TBox,
  mode: TMode
) => {
  paintUnpressed(e.currentTarget);
  paintUnpressedAround(mode, id, newBoxes);
  if (leftUp && rightUp) {
    // BOTH UP
    revealAround(mode, id, newBoxes);
  } else {
    // IF NOT BOTH UP, RESET
    setTimeout(() => {
      leftUp = false;
      rightUp = false;
    }, 20);
  }
};

// ------------- ON MOUSE ENTER -------------

export const handleMouseEnter = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  mode: TMode,
  status: number,
  boxes: TBox
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1) {
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
  status: number,
  boxes: TBox
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1) {
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
  status: number,
  boxes: TBox,
  indicatorRef: React.MutableRefObject<HTMLButtonElement | null>
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1) {
    return;
  }
  // VARIABLES
  const id = e.currentTarget.parentElement?.id ?? "";
  // CHANGE INDICATOR
  if (indicatorRef.current) {
    indicatorRef.current.innerHTML = `<span role="img" aria-label="imoji">😮</span>`;
  }
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
  status: number,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1) {
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
  status: number,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  setStatus: React.Dispatch<React.SetStateAction<number>>,
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1 || e.buttons === 2) {
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
  if (status === 0) {
    setIsReady(false);
    const minesIndex = getMinesIndex(mode, parseInt(id));
    Object.keys(boxes).forEach((key) => {
      const count = countMinesAround(mode, minesIndex, parseInt(key));
      newBoxes[parseInt(key)].value = minesIndex.has(parseInt(key))
        ? -1
        : count;
      newBoxes[parseInt(key)].isMine = minesIndex.has(parseInt(key))
        ? true
        : false;
    });
    setBoxes(newBoxes);
    setIsReady(true);
    startGame(box, setStatus);
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
  status: number,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1 || e.buttons === 1) {
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
  status: number,
  indicatorRef: React.MutableRefObject<HTMLButtonElement | null>,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>
) => {
  e.preventDefault();
  // VALIDATION
  if (status > 1) {
    return;
  }
  // VARIABLES
  const newBoxes = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  // CHANGE INDICATOR
  if (indicatorRef.current) {
    indicatorRef.current.innerHTML = `<span role="img" aria-label="imoji">🙂</span>`;
  }
  // MOUSE UP LEFT
  if (e.button === 0) {
    leftUp = true;
    checkOrResetUp(e, parseInt(id), newBoxes, mode);
  }
  // MOUSE UP RIGHT
  if (e.button === 2) {
    rightUp = true;
    checkOrResetUp(e, parseInt(id), newBoxes, mode);
  }
  // UPDATE
  setBoxes(newBoxes);
};
