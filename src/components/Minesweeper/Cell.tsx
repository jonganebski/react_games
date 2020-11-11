import { GameStatus, Status } from "types/minsweeper.types";
import { useCell } from "hooks/minesweeper/useCell";
import React from "react";
import styled from "styled-components";
import { CellService } from "utils/minesweeper/utils";

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
  gameStatus: GameStatus;
  gameStart: (rowIdx: number, colIdx: number) => void;
  gameOver: () => void;
}

const Cell: React.FC<CellProps> = ({
  field,
  setField,
  cell,
  gameStatus,
  gameStart,
  gameOver,
}) => {
  const useCellResult = useCell(
    field,
    setField,
    cell,
    gameStatus,
    gameStart,
    gameOver
  );
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
