import { CELL_SIZE } from "constants/newMinesweeper";
import { useField } from "hooks/newMinesweeper/useField";
import { Difficulty } from "interfaces/newMinesweeper";
import React from "react";
import styled from "styled-components";

interface FieldProps {
  difficulty: Difficulty;
}

const Field = styled.section<FieldProps>`
  display: grid;
  grid-template-columns: ${({ difficulty }) =>
    `repeat(${difficulty.size.x}, ${CELL_SIZE}px)`};
  grid-template-rows: ${({ difficulty }) =>
    `repeat(${difficulty.size.y}, ${CELL_SIZE}px)`};
`;
const Cell = styled.div`
  border: 1px solid black;
`;

const NewMinesweeper = () => {
  const { difficulty, setDifficulty, field } = useField();

  return (
    <>
      <Field difficulty={difficulty}>
        {field &&
          field.map((row) =>
            row.map((cell, colIdx) => (
              <Cell key={colIdx}>{cell.getValue()}</Cell>
            ))
          )}
      </Field>
    </>
  );
};

export default NewMinesweeper;
