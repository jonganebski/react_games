import { Status } from "../../@types/newMinsweeper";
import { useCell } from "hooks/newMinesweeper/useCell";
import React from "react";
import styled from "styled-components";
import { CellService } from "utils/newMinesweeper/utils";

interface InputProps {
  status: Status;
  isDown: boolean;
  isMine: boolean;
}

const Input = styled.input<InputProps>`
  all: unset;
  background-color: ${({ status, isMine }) => {
    if (status === "revealed") {
      if (isMine) {
        return "red";
      }
      return "whitesmoke";
    }
    return "silver";
  }};
  border-top: ${({ status, isDown }) =>
    status === "revealed"
      ? "none"
      : isDown
      ? "2px solid dimgray"
      : "2px solid whitesmoke"};
  border-right: ${({ status, isDown }) =>
    status === "revealed"
      ? "none"
      : isDown
      ? "2px solid whitesmoke"
      : "2px solid dimgray"};
  border-bottom: ${({ status, isDown }) =>
    status === "revealed"
      ? "none"
      : isDown
      ? "2px solid whitesmoke"
      : "2px solid dimgray"};
  border-left: ${({ status, isDown }) =>
    status === "revealed"
      ? "none"
      : isDown
      ? "2px solid dimgray"
      : "2px solid whitesmoke"};
  text-align: center;
`;

interface CellProps {
  field: CellService[][];
  setField: React.Dispatch<React.SetStateAction<CellService[][] | null>>;
  cell: CellService;
}

const Cell: React.FC<CellProps> = ({ field, setField, cell }) => {
  const useCellResult = useCell(field, setField, cell);
  return (
    <Input
      id={cell.id}
      isDown={cell.isDown}
      status={cell.status}
      isMine={cell.isMine}
      readOnly
      {...useCellResult}
    ></Input>
  );
};

export default Cell;
