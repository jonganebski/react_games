import Cell from "components/NewMinesweeper/Cell";
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
  grid-gap: 1px;
  background-color: black;
  grid-template-columns: ${({ difficulty }) =>
    `repeat(${difficulty.size.x}, ${CELL_SIZE}px)`};
  grid-template-rows: ${({ difficulty }) =>
    `repeat(${difficulty.size.y}, ${CELL_SIZE}px)`};
`;

const NewMinesweeper = () => {
  const { difficulty, setDifficulty, field, setField } = useField();

  return (
    <>
      <Field difficulty={difficulty}>
        {field &&
          field.map((row) =>
            row.map((cell, colIdx) => (
              <Cell
                key={colIdx}
                field={field}
                setField={setField}
                cell={cell}
              />
            ))
          )}
      </Field>
    </>
  );
};

export default NewMinesweeper;
