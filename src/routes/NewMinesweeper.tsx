import Cell from "components/NewMinesweeper/Cell";
import FieldHeader from "components/NewMinesweeper/FieldHeader";
import { CELL_SIZE, easy, hard, midd } from "constants/newMinesweeper";
import { useField } from "hooks/newMinesweeper/useField";
import { useGameStatus } from "hooks/newMinesweeper/useGameStatus";
import { usePlayerEmoji } from "hooks/newMinesweeper/usePlayerImoji";
import { Difficulty } from "interfaces/newMinesweeper";
import React from "react";
import styled from "styled-components";

interface FieldProps {
  difficulty: Difficulty;
}

const Field = styled.section<FieldProps>`
  width: min-content;
  display: grid;
  grid-gap: 1px;
  background-color: dimgray;
  grid-template-columns: ${({ difficulty }) =>
    `repeat(${difficulty.size.x}, ${CELL_SIZE}px)`};
  grid-template-rows: ${({ difficulty }) =>
    `repeat(${difficulty.size.y}, ${CELL_SIZE}px)`};
`;

const FieldContainer = styled.main`
  width: min-content;
`;

const NewMinesweeper = () => {
  const { field, setField, generateField } = useField();
  const {
    difficulty,
    time,
    flagCount,
    gameStatus,
    gameReady,
    gameStart,
    gameOver,
  } = useGameStatus(field, generateField);
  const { imoji, mouseEventHandlers } = usePlayerEmoji(gameStatus);

  return (
    <>
      <button onClick={() => gameReady(difficulty)}>reset</button>
      <button onClick={() => gameReady(easy)}>easy</button>
      <button onClick={() => gameReady(midd)}>midd</button>
      <button onClick={() => gameReady(hard)}>hard</button>
      <FieldContainer>
        <FieldHeader
          difficulty={difficulty}
          imoji={imoji}
          time={time}
          gameReady={gameReady}
          flagCount={flagCount}
        />
        <Field difficulty={difficulty} {...mouseEventHandlers}>
          {field?.map((row) =>
            row.map((cell, colIdx) => (
              <Cell
                key={colIdx}
                field={field}
                setField={setField}
                cell={cell}
                gameStatus={gameStatus}
                gameStart={gameStart}
                gameOver={gameOver}
              />
            ))
          )}
        </Field>
      </FieldContainer>
    </>
  );
};

export default NewMinesweeper;
