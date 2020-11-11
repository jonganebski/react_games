import { Status } from "../../types/minsweeper.types";

export const getArroundCells = (
  arr: any[][],
  rowIdx: number,
  colIdx: number
) => {
  let arroundValues = [];
  if (arr[rowIdx - 1]) {
    const a = arr[rowIdx - 1][colIdx];
    const b = arr[rowIdx - 1][colIdx + 1];
    const c = arr[rowIdx - 1][colIdx - 1];
    if (a) arroundValues.push(a);
    if (b) arroundValues.push(b);
    if (c) arroundValues.push(c);
  }
  if (arr[rowIdx + 1]) {
    const d = arr[rowIdx + 1][colIdx + 1];
    const e = arr[rowIdx + 1][colIdx];
    const f = arr[rowIdx + 1][colIdx - 1];
    if (d) arroundValues.push(d);
    if (e) arroundValues.push(e);
    if (f) arroundValues.push(f);
  }
  const g = arr[rowIdx][colIdx + 1];
  const h = arr[rowIdx][colIdx - 1];
  if (g) arroundValues.push(g);
  if (h) arroundValues.push(h);
  return arroundValues;
};

export class CellService {
  isMine: boolean;
  isDown: boolean;
  status: Status;
  rowIdx: number;
  colIdx: number;
  mines: boolean[][];
  id: string;
  constructor(
    isMine: boolean,
    isDown: boolean,
    status: Status,
    rowIdx: number,
    colIdx: number,
    mines: boolean[][]
  ) {
    this.isMine = isMine;
    this.isDown = isDown;
    this.status = status;
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
    this.mines = mines;
    this.id = `${this.rowIdx}-${this.colIdx}`;
  }
  private FLAG = "🚩";
  private QUESTION = "❓";
  private MINE = "💣";
  private isKaboom = () => this.isMine && this.status === "revealed";

  getValue = () => {
    if (this.mines.length === 0) {
      return "";
    }
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
      const minesArround = getArroundCells(
        this.mines,
        this.rowIdx,
        this.colIdx
      );
      if (minesArround.length === 0) {
        return "";
      }
      return minesArround.length + "";
    }
  };

  changeStatus = (str: "reveal" | "else") => {
    if (str === "reveal") {
      this.status = "revealed";
    }
    if (str === "else") {
      if (this.status === "init") {
        this.status = "flaged";
      } else if (this.status === "flaged") {
        this.status = "question";
      } else if (this.status === "question") {
        this.status = "init";
      }
    }
    return { isSafe: !this.isKaboom(), value: this.getValue() };
  };
}

// const getContentColor = (props: StyledProps<IBoxContent>) => {
//   switch (props.value) {
//     case 1:
//       return "#00B5D8"; // cyan.500
//     case 2:
//       return "#38A169"; // green.500
//     case 3:
//       return "#E53E3E"; // red.500
//     case 4:
//       return "#3182CE"; // blue.500
//     case 5:
//       return "#DD6B20"; // orange.500
//     case 6:
//       return "#319795"; // teal.500
//     case 7:
//       return "#805AD5"; // pruple.500
//     case 8:
//       return "black";
//   }
// };
