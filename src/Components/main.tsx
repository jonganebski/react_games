import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { countMinesAround, getMinesIndex } from "../utils/minesweeper";

export type TBox = {
  [key: number]: {
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

const Container = styled.div`
  display: grid;
  background-color: dimgray;
  gap: 1px;
`;

const MineBoxShell = styled.div`
  width: 25px;
  height: 25px;
  background-color: lightgray;
  border-top: 3px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 3px solid whitesmoke;
  border-bottom: 2px solid dimgray;
  opacity: 0.5;
`;

const MineBox = styled.div`
  width: 25px;
  height: 25px;
  background-color: lightgray;
`;

// 9x9 16x16 30X16
// 10   40    99
const easy = { totalMines: 10, size: { x: 9, y: 9 }, level: "easy" };
const midd = { totalMines: 40, size: { x: 16, y: 16 }, level: "moderate" };
const hard = { totalMines: 99, size: { x: 30, y: 16 }, level: "hard" };
const mineBoxSize = 25;

const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.preventDefault();
  console.log("mouse down");
  // 열린 상태라면 아무런 효과가 없음.
  // MineBox를 눌린 모양으로 변경.
  e.currentTarget.style.borderTop = "2px solid dimgray";
  e.currentTarget.style.borderRight = "3px solid whitesmoke";
  e.currentTarget.style.borderBottom = "3px solid whitesmoke";
  e.currentTarget.style.borderLeft = "2px solid dimgray";
};

const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.preventDefault();
  console.log("right click");
  // 초기화된 박스에만 효과를 미친다.
  // 1. 깃발 표시
  // 2. 깃발이라면 물음표 표시
  // 3. 물음표라면 원상복귀
};

const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.preventDefault();
  console.log("double click");
  // 이미 열린 박스이고 숫자라면
  // 1. 깃발을 제외한 주변의 박스를 연다.
};

const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.preventDefault();

  console.log("click");
  // 1. MineBox가 열림.
  e.currentTarget.style.opacity = "0";
  // 2.
};

const Main = () => {
  const [mode, setMode] = useState<TMode>(midd);
  const [box, setBox] = useState<TBox | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const minesIndex = getMinesIndex(mode);
    console.log(minesIndex);
    const stateArr = Array.from(Array(mode.size.x * mode.size.y).keys());
    const stateObj: TBox = {};
    stateArr.forEach(
      (num) =>
        (stateObj[num + 1] = {
          isMine: minesIndex.has(num + 1) ? true : false,
          isFlaged: false,
          isQuestion: false,
          isRevealed: false,
        })
    );
    console.log(stateObj);
    setBox(stateObj);
  }, [mode]);

  return (
    <>
      <Container
        style={{
          width: "min-content",
          gridTemplateColumns: `repeat(${mode.size.x}, ${mineBoxSize}px)`,
        }}
      >
        {box &&
          Object.entries(box).map(([_, { isMine }], i) => (
            <MineBox
              key={i}
              id={`${i + 1}`}
              style={{
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {isMine ? "*" : countMinesAround(mode, box, i + 1)}
              <MineBoxShell
                onContextMenu={handleContextMenu}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleClick}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ zIndex: 10, position: "absolute" }}
              ></MineBoxShell>
            </MineBox>
          ))}
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
