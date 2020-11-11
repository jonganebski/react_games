import Cell from "components/NewMinesweeper/Cell";
import { CELL_SIZE, easy, hard, midd } from "constants/newMinesweeper";
import { useField } from "hooks/newMinesweeper/useField";
import { useGameStatus } from "hooks/newMinesweeper/useGameStatus";
import { useTimer } from "hooks/useTimer";
import { Difficulty } from "interfaces/newMinesweeper";
import React from "react";
import styled from "styled-components";
import { timeToString } from "utils/globalUtils";

interface FieldProps {
  difficulty: Difficulty;
}

const Field = styled.section<FieldProps>`
  display: grid;
  grid-gap: 1px;
  background-color: black;
  grid-template-columns: ${({ difficulty }) =>
    `repeat(${difficulty.size.x}, ${CELL_SIZE}px)`};
  grid-template-rows: ${({ difficulty }) =>
    `repeat(${difficulty.size.y}, ${CELL_SIZE}px)`};
`;

const NewMinesweeper = () => {
  const {
    difficulty,
    setDifficulty,
    field,
    setField,
    deployMines,
    setDummyField,
  } = useField();
  const { gameStatus, gameReady, gameStart, gameOver, time } = useGameStatus(
    field,
    deployMines,
    setDummyField
  );

  return (
    <>
      <span>{difficulty.totalMines}</span>
      <button onClick={gameReady}>reset</button>
      <span>{timeToString(time).substring(0, 5)}</span>
      <button onClick={() => setDifficulty(easy)}>easy</button>
      <button onClick={() => setDifficulty(midd)}>midd</button>
      <button onClick={() => setDifficulty(hard)}>hard</button>
      <Field difficulty={difficulty}>
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
    </>
  );
};

export default NewMinesweeper;
