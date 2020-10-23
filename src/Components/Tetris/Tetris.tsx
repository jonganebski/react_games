import React from "react";
import styled from "styled-components";
import { TMatrix, TTetriminos } from "../../@types/tetris";
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

const Left = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: tomato;
`;

const Center = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: steelblue;
`;

const Right = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: peru;
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

  const checkWillCollide = (
    matrix: TMatrix,
    tetri: TTetriminos,
    dirX: number,
    dirY: number
  ) => {
    for (let y = 0; y < tetri.shape.length; ++y) {
      for (let x = 0; x < tetri.shape[y].length; ++x) {
        if (tetri.shape[y][x] !== ".") {
          const rowBelow = matrix[tetri.pos.y + y + dirY];
          const nextCell = rowBelow && rowBelow[x + tetri.pos.x + dirX];
          const isLocked = nextCell && nextCell[1] === "locked" ? true : false;
          if (!rowBelow || !nextCell || isLocked) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const drop = () => {
    const willCollide = checkWillCollide(matrix, tetri, 0, 1);
    if (!willCollide) {
      setTetri((prev) => ({
        ...prev,
        pos: { ...prev.pos, y: prev.pos.y + 1 },
      }));
    }
  };

  const moveHorizontal = (dir: number) => {
    const willCollide = checkWillCollide(matrix, tetri, dir, 0);
    if (!willCollide) {
      setTetri((prev) => ({
        ...prev,
        pos: { ...prev.pos, x: prev.pos.x + dir },
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      moveHorizontal(-1);
    }
    if (e.key === "ArrowRight") {
      moveHorizontal(1);
    }
    if (e.key === "ArrowDown") {
      drop();
    }
    if (e.key === "ArrowUp") {
    }
  };

  return (
    <Wrapper role="button" tabIndex={0} onKeyDown={handleKeyDown}>
      <Left>
        <div>Leaderboard</div>
      </Left>
      <Center>
        <Matrix>
          {matrix.map((row) =>
            row.map(([type], i) => <Cell key={i} type={type}></Cell>)
          )}
        </Matrix>
      </Center>
      <Right>
        <div>Next Tetrimino</div>
        <div>Score</div>
        <div>Level</div>
      </Right>
    </Wrapper>
  );
};

export default Tetris;
