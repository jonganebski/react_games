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

export const solve = (arr2D: number[][]) => {
  limit++;
  // console.log(limit);
  if (limit === 20000) {
    return true;
  }
  const { rowIdx, numIdx } = findEmpty(arr2D);
  console.log(rowIdx, numIdx);
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

export const generateSudoku = async () => {
  const coolTemplate: number[][] = [
    [7, 8, 5, 4, 3, 9, 1, 2, 6],
    [6, 1, 2, 8, 7, 5, 3, 4, 9],
    [4, 9, 3, 6, 2, 1, 5, 7, 8],
    [8, 5, 7, 9, 4, 3, 2, 6, 1],
    [2, 6, 1, 7, 5, 8, 9, 3, 4],
    [9, 3, 4, 1, 6, 2, 7, 8, 5],
    [5, 7, 8, 3, 9, 4, 6, 1, 2],
    [1, 2, 6, 5, 8, 7, 4, 9, 3],
    [3, 4, 9, 2, 1, 6, 8, 5, 7],
  ];

  const hotTemplate = JSON.parse(JSON.stringify(coolTemplate)) as number[][];

  for (let i = 0; i < 10; i++) {
    const switchNum1 = Math.ceil(Math.random() * 9);
    const switchNum2 = Math.ceil(Math.random() * 9);

    hotTemplate.forEach((row, rowIdx) =>
      row.forEach((num, numIdx) => {
        if (num === switchNum1) {
          hotTemplate[rowIdx].splice(numIdx, 1, switchNum2);
        }
        if (num === switchNum2) {
          hotTemplate[rowIdx].splice(numIdx, 1, switchNum1);
        }
      })
    );
  }
  const isValid = hotTemplate.every((row, rowIdx) =>
    row.every((num, numIdx) => validator(rowIdx, numIdx, num, hotTemplate))
  );
  console.log(isValid, hotTemplate);
};
