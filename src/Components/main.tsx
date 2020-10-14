import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  revealChain,
  countMinesAround,
  getBoxesAround,
  getMinesIndex,
} from "../utils/minesweeper";

export type TBox = {
  [key: number]: {
    value: number;
    isRevealed: boolean;
    isMine: boolean;
    isFlaged: boolean;
    isQuestion: boolean;
  };
};

export type TMode = {
  totalMines: number;
  size: {
    x: number;
    y: number;
  };
  level: string;
};

type TStart = {
  bool: boolean;
  id: number;
};

type TOver = {
  bool: boolean;
  isVictory: boolean;
};

const Container = styled.div`
  display: grid;
  gap: 1px;
`;

const MineBox = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  background-color: lightgray;
`;

interface IMineBoxShellProps {
  isRevealed: boolean;
  isMine: boolean;
  over: TOver;
  onClick: (e: any) => void;
  onContextMenu: (e: any) => any;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (e: any) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MineBoxShell = styled.div<IMineBoxShellProps>`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: lightgray;
  border-top: 3px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 3px solid whitesmoke;
  border-bottom: 2px solid dimgray;
  z-index: 10;
  opacity: ${(props) => {
    if (props.over.bool && !props.over.isVictory && props.isMine) {
      console.log("Boom!!!");
      return 0;
    }
    if (props.isRevealed) {
      return 0;
    }
    if (!props.isRevealed) {
      return 0.6;
    }
  }};
` as React.FC<IMineBoxShellProps>;

interface IBoxContent {
  isMine: boolean;
}

const BoxContent = styled.div<IBoxContent>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isMine ? "red" : "lightgray")};
  display: flex;
  align-items: center;
  justify-content: center;
` as React.FC<IBoxContent>;

// 9x9 16x16 30X16
// 10   40    99
const easy = { totalMines: 10, size: { x: 9, y: 9 }, level: "easy" };
const midd = { totalMines: 40, size: { x: 16, y: 16 }, level: "moderate" };
const hard = { totalMines: 99, size: { x: 30, y: 16 }, level: "hard" };
const mineBoxSize = 25;

const handleMouseEnter = (
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
const handleMouseLeave = (
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

const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  over: TOver
) => {
  if (over.bool) {
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

const handleDoubleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  over: TOver
) => {
  if (over.bool) {
    return;
  }
  e.preventDefault();
  console.log("double click");
  // 이미 열린 박스이고 숫자라면
  // 1. 깃발을 제외한 주변의 박스를 연다.
};

const handleClick = (
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
  // 1. MineBox가 열림.
  const box = boxes[parseInt(id)];
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

const handleMouseUp = (
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

const Main = () => {
  const [mode, setMode] = useState<TMode>(midd);
  const [boxes, setBoxes] = useState<TBox | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [start, setStart] = useState<TStart>({ bool: false, id: 0 });
  const [over, setOver] = useState<TOver>({ bool: false, isVictory: false });

  useEffect(() => {
    console.log("mode useEffect!");
    setStart({ bool: false, id: 0 });
    setOver({ bool: false, isVictory: false });
    const stateArr = Array.from(Array(mode.size.x * mode.size.y).keys());
    const stateObj: TBox = {};
    stateArr.forEach(
      (num) =>
        (stateObj[num + 1] = {
          value: -1,
          isMine: false,
          isFlaged: false,
          isQuestion: false,
          isRevealed: false,
        })
    );
    setBoxes(stateObj);
  }, [mode]);

  useEffect(() => {
    if (start.bool && boxes) {
      const newBoxes = { ...boxes };
      const minesIndex = getMinesIndex(mode, start.id);
      Object.entries(boxes).forEach(([key, value]) => {
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
    }
  }, [start]);
  return (
    <>
      <Container
        style={{
          width: "min-content",
          backgroundColor: "dimgray",
          gridTemplateColumns: `repeat(${mode.size.x}, ${mineBoxSize}px)`,
        }}
      >
        {boxes &&
          Object.entries(boxes).map(([_, { isRevealed, isMine, value }], i) => {
            return (
              <MineBox key={i} id={`${i + 1}`}>
                <MineBoxShell
                  isRevealed={isRevealed}
                  over={over}
                  isMine={isMine}
                  onClick={(e) =>
                    handleClick(e, boxes, setBoxes, over, setOver, mode)
                  }
                  onContextMenu={(e) => e.preventDefault()}
                  onDoubleClick={(e) => handleDoubleClick(e, over)}
                  onMouseDown={(e) => handleMouseDown(e, over)}
                  onMouseUp={(e) =>
                    handleMouseUp(
                      e,
                      start,
                      setStart,
                      boxes,
                      setBoxes,
                      over,
                      setOver,
                      mode
                    )
                  }
                  onMouseEnter={(e) => handleMouseEnter(e, over)}
                  onMouseLeave={(e) => handleMouseLeave(e, over)}
                ></MineBoxShell>
                {isReady && (
                  <BoxContent isMine={isMine}>
                    {value === -1 ? "💣" : value === 0 ? "" : value}
                  </BoxContent>
                )}
              </MineBox>
            );
          })}
      </Container>
      <select
        defaultValue={midd.level}
        onChange={(e) => {
          if (e.currentTarget.value === easy.level) {
            setMode(easy);
          } else if (e.currentTarget.value === midd.level) {
            setMode(midd);
          } else {
            setMode(hard);
          }
        }}
      >
        <option value={easy.level}>Easy</option>
        <option value={midd.level}>Moderate</option>
        <option value={hard.level}>Hard</option>
      </select>
    </>
  );
};

export default Main;
