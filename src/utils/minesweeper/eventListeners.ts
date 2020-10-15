import { TBox, TMode, TOver, TStart } from "../../@types/minesweeper";
import { revealAround, revealChain } from "./utils";

// ------------- ON MOUSE ENTER -------------

export const handleMouseEnter = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  over: TOver
) => {
  if (over.bool) {
    return;
  }
  e.preventDefault();
  if (e.buttons === 1) {
    // 이전 박스를 클릭한 상태
    console.log("you are draging");
    // 초기화된 박스의 경우
    //들어가는 박스도 mouseDown의 눌린 모양으로 바꾼다.
    e.currentTarget.style.borderTop = "2px solid dimgray";
    e.currentTarget.style.borderRight = "3px solid whitesmoke";
    e.currentTarget.style.borderBottom = "3px solid whitesmoke";
    e.currentTarget.style.borderLeft = "2px solid dimgray";
  } else {
    return;
  }
};

// ------------- ON MOUSE LEAVE -------------

export const handleMouseLeave = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  over: TOver
) => {
  if (over.bool) {
    return;
  }
  e.preventDefault();
  if (e.buttons === 1) {
    console.log("you are draging");
    // mouseEnter로 모양이 바뀐 경우에만
    // 나가는 박스의 모양을 원상복구시킨다.
    e.currentTarget.style.borderTop = "3px solid whitesmoke";
    e.currentTarget.style.borderRight = "2px solid dimgray";
    e.currentTarget.style.borderBottom = "2px solid dimgray";
    e.currentTarget.style.borderLeft = "3px solid whitesmoke";
  } else {
    return;
  }
};

// ------------- ON MOUSE DOWN -------------

export const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  over: TOver
) => {
  if (over.bool) {
    return;
  }
  if (e.button === 2) {
    return;
  }
  e.preventDefault();
  console.log("mouse down");
  // 열린 상태라면 아무런 효과가 없음.
  // MineBox를 눌린 모양으로 변경.
  e.currentTarget.style.borderTop = "2px solid dimgray";
  e.currentTarget.style.borderRight = "3px solid whitesmoke";
  e.currentTarget.style.borderBottom = "3px solid whitesmoke";
  e.currentTarget.style.borderLeft = "2px solid dimgray";
};

// ------------- ON DOUBLE CLICK -------------

export const handleDoubleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  boxes: TBox,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  mode: TMode,
  over: TOver
) => {
  if (over.bool) {
    return;
  }
  e.preventDefault();
  console.log("double click");
  // 이미 열린 박스이고 숫자라면
  // 1. 깃발을 제외한 주변의 박스를 연다.
  const id = e.currentTarget.parentElement?.id ?? "";
  const newBoxes: TBox = { ...boxes };
  const box = newBoxes[parseInt(id)];
  if (!box.isRevealed || box.isFlaged || box.isQuestion) {
    return;
  }
  revealAround(mode, parseInt(id), newBoxes);
  setBoxes(newBoxes);
};

// ------------- ON CLICK -------------

export const handleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  boxes: TBox,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  over: TOver,
  setOver: React.Dispatch<React.SetStateAction<TOver>>,
  mode: TMode
) => {
  if (over.bool) {
    return;
  }
  e.preventDefault();
  console.log("click: ");
  const id = e.currentTarget.parentElement?.id ?? "";
  const newBoxes: TBox = { ...boxes };
  const box = boxes[parseInt(id)];
  if (box.isFlaged || box.isQuestion) {
    return;
  }
  // 1. MineBox가 열림.
  newBoxes[parseInt(id)].isRevealed = true;
  // 2. 지뢰인 경우
  if (box.isMine) {
    console.log("You failed!");
    setOver({ bool: true, isVictory: false });
    return;
  }
  // 3. 0 인 경우
  console.log(box.value);
  if (box.value === 0) {
    revealChain(mode, parseInt(id), newBoxes);
  }
  setBoxes(newBoxes);
};

// ------------- ON CONTEXT MENU -------------

export const handleContextMenu = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  boxes: TBox,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  over: TOver
) => {
  console.log("clicked context menu");
  if (over.bool) {
    return;
  }
  e.preventDefault();
  const newBoxes = { ...boxes };
  const id = e.currentTarget.parentElement?.id ?? "";
  const box = newBoxes[parseInt(id)];
  if (box.isRevealed) {
    return;
  }
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
  start: TStart,
  setStart: React.Dispatch<React.SetStateAction<TStart>>,
  boxes: TBox,
  setBoxes: React.Dispatch<React.SetStateAction<TBox | null>>,
  over: TOver,
  setOver: React.Dispatch<React.SetStateAction<TOver>>,
  mode: TMode
) => {
  if (over.bool) {
    return;
  }
  e.preventDefault();
  e.currentTarget.style.borderTop = "3px solid whitesmoke";
  e.currentTarget.style.borderRight = "2px solid dimgray";
  e.currentTarget.style.borderBottom = "2px solid dimgray";
  e.currentTarget.style.borderLeft = "3px solid whitesmoke";
  if (e.button === 0) {
    console.log("mouse up: ", e.button);
    const id = e.currentTarget.parentElement?.id ?? "";
    // start!
    if (!start.bool) {
      setStart({ bool: true, id: parseInt(id) });
    }
  } else if (e.button === 2) {
    console.log("right mouse up");
    // 초기화된 박스에만 효과를 미친다.
    // 1. 깃발 표시
    // 2. 깃발이라면 물음표 표시
    // 3. 물음표라면 원상복귀
  } else {
    return;
  }
};
