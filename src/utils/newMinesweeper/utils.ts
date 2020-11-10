import { Status } from "../../@types/newMinsweeper";

export class CellService {
  isMine: boolean;
  status: Status;
  rowIdx: number;
  colIdx: number;
  mines: boolean[][];
  constructor(
    isMine: boolean,
    status: Status,
    rowIdx: number,
    colIdx: number,
    mines: boolean[][]
  ) {
    this.isMine = isMine;
    this.status = status;
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
    this.mines = mines;
  }
  private FLAG = "🚩";
  private QUESTION = "❓";
  private MINE = "💣";
  private isKaboom = () => this.isMine && this.status === "revealed";

  getValue = () => {
    if (this.status === "flaged") {
      return this.FLAG;
    } else if (this.status === "question") {
      return this.QUESTION;
    } else if (this.status === "init") {
      return "";
    } else {
      if (this.isKaboom()) {
        return this.MINE;
      }
      let count = 0;
      if (this.mines[this.rowIdx - 1]) {
        if (this.mines[this.rowIdx - 1][this.colIdx]) count += 1;
        if (this.mines[this.rowIdx - 1][this.colIdx + 1]) count += 1;
        if (this.mines[this.rowIdx - 1][this.colIdx - 1]) count += 1;
      }
      if (this.mines[this.rowIdx + 1]) {
        if (this.mines[this.rowIdx + 1][this.colIdx + 1]) count += 1;
        if (this.mines[this.rowIdx + 1][this.colIdx]) count += 1;
        if (this.mines[this.rowIdx + 1][this.colIdx - 1]) count += 1;
      }
      if (this.mines[this.rowIdx][this.colIdx + 1]) count += 1;
      if (this.mines[this.rowIdx][this.colIdx - 1]) count += 1;

      return count + "";
    }
  };

  changeStatus = (btnNum: number) => {
    if (btnNum === 0) {
      this.status = "revealed";
    }
    if (btnNum === 2) {
      if (this.status === "init") {
        this.status = "flaged";
      } else if (this.status === "flaged") {
        this.status = "question";
      } else if (this.status === "question") {
        this.status = "init";
      }
    }
    return { isSafe: this.isKaboom(), value: this.getValue() };
  };
}
