import React from "react";

type Status = "init" | "revealed" | "flaged" | "question";

const NewMinesweeper = () => {
  class Cell {
    isMine: boolean;
    status: Status;
    rowIdx: number;
    colIdx: number;
    constructor(
      isMine: boolean,
      status: Status,
      rowIdx: number,
      colIdx: number
    ) {
      this.isMine = isMine;
      this.status = status;
      this.rowIdx = rowIdx;
      this.colIdx = colIdx;
    }
    private isKaboom = () => this.isMine && this.status === "revealed";
    private getValue = () => {
      if (!this.isMine) {
        // 주변 지뢰들의 수를 센다.
      }
    };
    changeStatus = (status: Status) => {
      this.status = status;
      if (this.status === "revealed") {
        if (this.isKaboom()) {
          return { safe: false, value: "💣" };
        }
        return { safe: true, value: this.getValue() };
      } else if (this.status === "flaged") {
        return { safe: true, value: "🚩" };
      } else if (this.status === "question") {
        return { safe: true, value: "❓" };
      } else {
        return { safe: true, value: "" };
      }
    };
  }

  const cell = new Cell(true, "init", 1, 1);
  console.log(cell.changeStatus("flaged"));
  console.log(cell.changeStatus("question"));
  console.log(cell.changeStatus("init"));
  console.log(cell.changeStatus("revealed"));

  return <></>;
};

export default NewMinesweeper;
