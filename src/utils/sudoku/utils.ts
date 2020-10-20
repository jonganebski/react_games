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

let limitA = 0;

export const solveA = (arr2D: number[][]) => {
  limitA++;
  // console.log(limitA);
  if (limitA === 20000) {
    return true;
  }
  const { rowIdx, numIdx } = findEmpty(arr2D);
  if (numIdx !== null) {
    for (let n = 1; n < 10; n++) {
      const isValid = validator(rowIdx, numIdx, n, arr2D);
      if (isValid) {
        arr2D[rowIdx].splice(numIdx, 1, n);
        const isFinished = solveA(arr2D);
        if (isFinished) {
          return true;
        }
        arr2D[rowIdx].splice(numIdx, 1, 0);
      }
    }
  } else {
    console.log("Solve A Finished");
    return true;
  }
};

let limitB = 0;

export const solveB = (arr2D: number[][]) => {
  limitB++;
  // console.log(limitB);
  if (limitB === 20000) {
    return true;
  }
  const { rowIdx, numIdx } = findEmpty(arr2D);
  if (numIdx !== null) {
    for (let n = 9; n > 0; n--) {
      const isValid = validator(rowIdx, numIdx, n, arr2D);
      if (isValid) {
        arr2D[rowIdx].splice(numIdx, 1, n);
        const isFinished = solveB(arr2D);
        if (isFinished) {
          return true;
        }
        arr2D[rowIdx].splice(numIdx, 1, 0);
      }
    }
  } else {
    console.log("Solve B Finished");
    return true;
  }
};

export const generateSudoku = async () => {
  // const coolTemplate: number[][] = [
  //   [7, 6, 2, 3, 4, 8, 1, 5, 9],
  //   [3, 8, 5, 9, 1, 6, 7, 2, 4],
  //   [4, 1, 9, 5, 7, 2, 6, 8, 3],
  //   [5, 7, 3, 6, 8, 1, 4, 9, 2],
  //   [1, 4, 8, 2, 5, 9, 3, 6, 7],
  //   [9, 2, 6, 7, 3, 4, 8, 1, 5],
  //   [2, 5, 7, 8, 6, 3, 9, 4, 1],
  //   [8, 3, 4, 1, 9, 5, 2, 7, 6],
  //   [6, 9, 1, 4, 2, 7, 5, 3, 8],
  // ];

  const coolTemplate: number[][] = [
    [1, 4, 5, 3, 2, 7, 6, 9, 8],
    [8, 3, 9, 6, 5, 4, 1, 2, 7],
    [6, 7, 2, 9, 1, 8, 5, 4, 3],
    [4, 9, 6, 1, 8, 5, 3, 7, 2],
    [2, 1, 8, 4, 7, 3, 9, 5, 6],
    [7, 5, 3, 2, 9, 6, 4, 8, 1],
    [3, 6, 7, 5, 4, 2, 8, 1, 9],
    [9, 8, 4, 7, 6, 1, 2, 3, 5],
    [5, 2, 1, 8, 3, 9, 7, 6, 4],
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

  hotTemplate.splice(0, 3, hotTemplate[2], hotTemplate[0], hotTemplate[1]);
  hotTemplate.splice(3, 3, hotTemplate[5], hotTemplate[3], hotTemplate[4]);
  hotTemplate.splice(6, 3, hotTemplate[8], hotTemplate[6], hotTemplate[7]);

  hotTemplate.forEach((row) => {
    row.splice(0, 3, row[2], row[0], row[1]);
    row.splice(3, 3, row[5], row[3], row[4]);
    row.splice(6, 3, row[8], row[6], row[7]);
  });

  let count = 0;
  for (let i = 0; i < 500; i++) {
    const randRowIdx = Math.floor(Math.random() * 9);
    const randNumIdx = Math.floor(Math.random() * 9);
    if (hotTemplate[randRowIdx][randNumIdx] !== 0) {
      hotTemplate[randRowIdx].splice(randNumIdx, 1, 0);
      count++;
    }
    if (count === 40) {
      break;
    }
  }

  const testArrA = JSON.parse(JSON.stringify(hotTemplate));
  const testArrB = JSON.parse(JSON.stringify(hotTemplate));
  solveA(testArrA);
  solveB(testArrB);

  if (JSON.stringify(testArrA) === JSON.stringify(testArrB)) {
    console.log("regen..");
    generateSudoku();
  }

  return hotTemplate;
};
