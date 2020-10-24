import React from "react";
import styled from "styled-components";
import { createMatrix } from "../../utils/Tetris/utils";
import { Cell } from "./Tetris";

const Wrapper = styled.div`
  border: 1px solid gray;
  display: grid;
  grid-template-columns: repeat(5, 20px);
  grid-template-rows: repeat(5, 20px);
`;

const DisplayNextTetri = () => {
  return (
    <Wrapper>
      {createMatrix(5, 5).map((row) =>
        row.map((_, i) => <Cell key={i} type="I" borderW="10px"></Cell>)
      )}
    </Wrapper>
  );
};

export default DisplayNextTetri;
