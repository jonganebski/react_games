import React, { useState } from "react";
import styled from "styled-components";

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
  if (e.buttons === 1) {
    // 이전 박스를 클릭한 상태
    console.log("you are draging");
    // 초기화된 박스의 경우
    //들어가는 박스도 mouseDown의 눌린 모양으로 바꾼다.
  } else {
    return;
  }
};
const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (e.buttons === 1) {
    console.log("you are draging");
    // mouseEnter로 모양이 바뀐 경우에만
    // 나가는 박스의 모양을 원상복구시킨다.
  } else {
    return;
  }
};

const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  console.log("mouse down");
  // 열린 상태라면 아무런 효과가 없음.
  // MineBox를 눌린 모양으로 변경.
};

const handleAuxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  console.log("right click");
  // 초기화된 박스에만 효과를 미친다.
  // 1. 깃발 표시
  // 2. 깃발이라면 물음표 표시
  // 3. 물음표라면 원상복귀
};

const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  console.log("double click");
  // 이미 열린 박스이고 숫자라면
  // 1. 깃발을 제외한 주변의 박스를 연다.
};

const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  console.log("click");
  // 1. MineBox가 열림.
  // 2.
};

const Main = () => {
  const [size, setSize] = useState(midd.size);
  return (
    <>
      <Container
        style={{
          width: "min-content",
          gridTemplateColumns: `repeat(${size.x}, ${mineBoxSize}px)`,
        }}
      >
        {Array.from(Array(size.x * size.y).keys()).map((_, i) => (
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
            1
            <MineBoxShell
              onAuxClick={handleAuxClick}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ zIndex: 10, opacity: 1, position: "absolute" }}
            ></MineBoxShell>
          </MineBox>
        ))}
      </Container>
      <select
        defaultValue={midd.level}
        onChange={(e) => {
          if (e.currentTarget.value === easy.level) {
            setSize(easy.size);
          } else if (e.currentTarget.value === midd.level) {
            setSize(midd.size);
          } else {
            setSize(hard.size);
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
