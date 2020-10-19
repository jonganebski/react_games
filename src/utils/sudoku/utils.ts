const getEachRowSubBox = (
  initialRowIdx: number,
  a: number,
  b: number,
  arr2D: number[][],
  subBox: number[][]
) => {
  for (let i = 0; i < 3; i++) {
    const subRow = arr2D[initialRowIdx + i].slice(a, b);
    subBox.push(subRow);
  }
};

const getSubBoxAction = (
  initialRowIdx: number,
  numIdx: number,
  arr2D: number[][],
  subBox: number[][]
) => {
  if (numIdx < 3) {
    getEachRowSubBox(initialRowIdx, 0, 3, arr2D, subBox);
  } else if (numIdx < 6) {
    getEachRowSubBox(initialRowIdx, 3, 6, arr2D, subBox);
  } else {
    getEachRowSubBox(initialRowIdx, 6, 9, arr2D, subBox);
  }
};

const getSubBox = (rowIdx: number, numIdx: number, arr2D: number[][]) => {
  const subBox: number[][] = [];
  if (rowIdx < 3) {
    getSubBoxAction(0, numIdx, arr2D, subBox);
  } else if (rowIdx < 6) {
    getSubBoxAction(3, numIdx, arr2D, subBox);
  } else {
    getSubBoxAction(6, numIdx, arr2D, subBox);
  }
  return subBox.flat();
};

const findEmpty = (arr2D: number[][]) => {
  const row = arr2D.find((row) => row.includes(0));
  const rowIdx = arr2D.findIndex((r) => r === row);
  if (row) {
    const numIdx = row.findIndex((num) => num === 0);
    return { rowIdx, numIdx };
  } else {
    return { rowIdx, numIdx: null };
  }
};

export const getColumn = (numIdx: number, arr2D: number[][]) => {
  const column: number[] = [];
  arr2D.forEach((row) => column.push(row[numIdx]));
  return column;
};

export const validator = (
  rowIdx: number,
  numIdx: number,
  n: number,
  arr: number[][]
) => {
  const arr2D = JSON.parse(JSON.stringify(arr)).map(
    (row: number[], I: number) => {
      if (I === rowIdx) {
        row.splice(numIdx, 1, 0);
      }
      return row;
    }
  );
  const row = arr2D[rowIdx];
  const column = getColumn(numIdx, arr2D);
  const subBox = getSubBox(rowIdx, numIdx, arr2D);
  const numSet = new Set(row.concat(column, subBox));
  if (numSet.has(n)) {
    return false;
  } else {
    return true;
  }
};

let limit = 0;
const solve = (arr2D: number[][]) => {
  limit++;
  if (limit === 10000) {
    return true;
  }
  const { rowIdx, numIdx } = findEmpty(arr2D);
  if (numIdx !== null) {
    for (let n = 1; n < 10; n++) {
      const isValid = validator(rowIdx, numIdx, n, arr2D);
      if (isValid) {
        arr2D[rowIdx].splice(numIdx, 1, n);
        const isFinished = solve(arr2D);
        if (isFinished) {
          return true;
        }
        arr2D[rowIdx].splice(numIdx, 1, 0);
      }
    }
  } else {
    console.log("Finished");
    return true;
  }
};

export const generateSudoku = () => {
  const arr2D: number[][] = [];
  for (let i = 0; i < 9; i++) {
    const emptyRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    arr2D.push(emptyRow);
  }

  let n = 0;
  for (let i = 0; i < 500; i++) {
    const randRowIdx = Math.floor(Math.random() * 9);
    const randNumIdx = Math.floor(Math.random() * 9);
    const randNum = Math.ceil(Math.random() * 9);
    const randBox = arr2D[randRowIdx][randNumIdx];
    const isValid = validator(randRowIdx, randNumIdx, randNum, arr2D);
    if (randBox === 0 && isValid) {
      arr2D[randRowIdx].splice(randNumIdx, 1, randNum);
      n++;
    }
    if (n === 20) {
      break;
    }
  }
  const template = JSON.parse(JSON.stringify(arr2D)) as number[][];
  return [template, arr2D];
};
