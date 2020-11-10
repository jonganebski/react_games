import { Status } from "../../@types/newMinsweeper";

export class CellService {
  isMine: boolean;
  status: Status;
  rowIdx: number;
  colIdx: number;
  constructor(isMine: boolean, status: Status, rowIdx: number, colIdx: number) {
    this.isMine = isMine;
    this.status = status;
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
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
      return "😁";
    } else {
      if (this.isKaboom()) {
        return this.MINE;
      }
      // 주변 지뢰들의 수
      return "1";
    }
  };
  changeStatus = (status: Status) => {
    this.status = status;
    return { isSafe: this.isKaboom(), value: this.getValue() };
  };
}
