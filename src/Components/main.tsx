import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 225px;
  display: grid;
`;

const MineBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: lightgray;
  border-top: 2px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 2px solid whitesmoke;
  border-bottom: 2px solid dimgray;
`;

// 9x9 16x16 30X16
// 10   40    99
const easy = { size: { x: 9, y: 9 }, level: "easy" };
const midd = { size: { x: 16, y: 16 }, level: "moderate" };
const hard = { size: { x: 30, y: 16 }, level: "hard" };

const Main = () => {
  const [size, setSize] = useState(midd.size);
  return (
    <>
      <Container style={{ gridTemplateColumns: `repeat(${size.x}, 1fr)` }}>
        {Array.from(Array(size.x * size.y).keys()).map((_, i) => (
          <MineBox
            key={i}
            onMouseDown={() => console.log("mouse down")}
            onMouseUp={() => console.log("mouse up ")}
            onMouseEnter={(e) => {
              if (e.buttons === 1) {
                console.log("you are draging");
              } else {
                return;
              }
            }}
            onMouseLeave={(e) => {
              if (e.buttons === 1) {
                console.log("you are draging");
              } else {
                return;
              }
            }}
          />
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
