import { useCell } from "hooks/newMinesweeper/useCell";
import React, { useState } from "react";
import styled from "styled-components";
import { CellService } from "utils/newMinesweeper/utils";

const Container = styled.input`
  all: unset;
  border: 1px solid black;
`;

interface CellProps {
  cell: CellService;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  const useCellResult = useCell(cell);
  return <Container readOnly {...useCellResult}></Container>;
};

export default Cell;
