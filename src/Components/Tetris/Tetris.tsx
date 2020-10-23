import React from "react";
import styled from "styled-components";
import { useMatrix } from "../../hooks/tetris/useMatrix";
import { useTetriminos } from "../../hooks/tetris/useTetriminos";

const MATRIX_W = 10;
const MATRIX_H = 20;

const CELL_WIDTH = "20px";
const CELL_HEIGHT = "20px";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Center = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: steelblue;
`;

const Matrix = styled.div`
  display: grid;
  grid-template-columns: repeat(${MATRIX_W}, ${CELL_WIDTH});
  grid-template-rows: repeat(${MATRIX_H}, ${CELL_HEIGHT});
  grid-gap: 1px;
  box-sizing: content-box;
  border: 2px solid black;
  background-color: black;
`;

interface ICellProps {
  type: string;
}

const Cell = styled.div<ICellProps>`
  background-color: ${(props) => (props.type === "." ? "gray" : "red")};
`;

const Tetris = () => {
  const [tetri, setTetri] = useTetriminos();
  const [matrix, setMatrix] = useMatrix(tetri);

  return (
    <Wrapper>
      <div>LEFT</div>
      <Center>
        <Matrix>
          {matrix.map((row) =>
            row.map(([type], i) => <Cell key={i} type={type}></Cell>)
          )}
        </Matrix>
      </Center>
      <div>RIGHT</div>
    </Wrapper>
  );
};

export default Tetris;
