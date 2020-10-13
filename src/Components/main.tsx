import React from "react";
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
const Main = () => {
  const x = 30;
  const y = 16;
  return (
    <Container style={{ gridTemplateColumns: `repeat(${x}, 1fr)` }}>
      {Array.from(Array(x * y).keys()).map((_, i) => (
        <MineBox key={i} />
      ))}
    </Container>
  );
};

export default Main;
