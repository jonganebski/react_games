const getEachRowSubTable = (
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

const getSubTableAction = (
  initialRowIdx: number,
  numIdx: number,
  arr2D: number[][],
  subBox: number[][]
) => {
  if (numIdx < 3) {
    getEachRowSubTable(initialRowIdx, 0, 3, arr2D, subBox);
  } else if (numIdx < 6) {
    getEachRowSubTable(initialRowIdx, 3, 6, arr2D, subBox);
  } else {
    getEachRowSubTable(initialRowIdx, 6, 9, arr2D, subBox);
  }
};

// Returns number[] in the same sub table of particular number
const getSubTable = (rowIdx: number, numIdx: number, arr2D: number[][]) => {
  const subTable: number[][] = [];
  if (rowIdx < 3) {
    getSubTableAction(0, numIdx, arr2D, subTable);
  } else if (rowIdx < 6) {
    getSubTableAction(3, numIdx, arr2D, subTable);
  } else {
    getSubTableAction(6, numIdx, arr2D, subTable);
  }
  return subTable.flat();
};

// Returns number[] in the same column of particular number
export const getColumn = (numIdx: number, arr2D: number[][]) => {
  const column: number[] = [];
  arr2D.forEach((row) => column.push(row[numIdx]));
  return column;
};

// Checks same number exists on the column, row, and subTable
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
  const subTable = getSubTable(rowIdx, numIdx, arr2D);
  const numSet = new Set(row.concat(column, subTable));
  if (numSet.has(n)) {
    return false;
  } else {
    return true;
  }
};

// Returns location of empty box.
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

// Solver Function A (attemps to solve it with order 1~9)
let limitA = 0;
export const solveA = (arr2D: number[][]) => {
  limitA++;
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

// Solver Function B (attemps to solve it with order 9~1)
let limitB = 0;
export const solveB = (arr2D: number[][]) => {
  limitB++;
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

// GENERATE NEW SUDOKU TABLE
// 1. Intead of computing whole new table, there is a 'mother table' and manipulates it following rules of Sudoku.
// 2. Randomly erase numers.
// 3. Sudoku solver function will try to solve it.
// (There are 2 solvers. But I couldn't take care of every possible answers. This is why this game may have more than one answer)
// 4. If 2 solvers return same answer, the table will be returned.
// 5. If not, it will attemp to make another table.
export const generateSudoku = async () => {
  const motherTable: number[][] = [
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
  const table = JSON.parse(JSON.stringify(motherTable)) as number[][];

  for (let i = 0; i < 10; i++) {
    const switchNum1 = Math.ceil(Math.random() * 9);
    const switchNum2 = Math.ceil(Math.random() * 9);

    table.forEach((row, rowIdx) =>
      row.forEach((num, numIdx) => {
        if (num === switchNum1) {
          table[rowIdx].splice(numIdx, 1, switchNum2);
        }
        if (num === switchNum2) {
          table[rowIdx].splice(numIdx, 1, switchNum1);
        }
      })
    );
  }

  table.splice(0, 3, table[2], table[0], table[1]);
  table.splice(3, 3, table[5], table[3], table[4]);
  table.splice(6, 3, table[8], table[6], table[7]);

  table.forEach((row) => {
    row.splice(0, 3, row[2], row[0], row[1]);
    row.splice(3, 3, row[5], row[3], row[4]);
    row.splice(6, 3, row[8], row[6], row[7]);
  });

  let count = 0;
  for (let i = 0; i < 500; i++) {
    const randRowIdx = Math.floor(Math.random() * 9);
    const randNumIdx = Math.floor(Math.random() * 9);
    if (table[randRowIdx][randNumIdx] !== 0) {
      table[randRowIdx].splice(randNumIdx, 1, 0);
      count++;
    }
    if (count === 40) {
      break;
    }
  }

  const testArrA = JSON.parse(JSON.stringify(table));
  const testArrB = JSON.parse(JSON.stringify(table));
  solveA(testArrA);
  solveB(testArrB);

  if (JSON.stringify(testArrA) === JSON.stringify(testArrB)) {
    console.log("regen..");
    generateSudoku();
  }

  return table;
};

// WHEN USER USES ARROWKEYS RIGHT OR LEFT
export const getNextXBox = (
  rowIdx: number,
  numIdx: number,
  keyType: "right" | "left"
) => {
  let nextColumn;
  let box;
  for (let i = 0; i < 9; i++) {
    if (keyType === "right") {
      nextColumn = numIdx + 2 + i;
      box = document.getElementById(
        `row${rowIdx + 1} column${
          nextColumn < 10 ? nextColumn : nextColumn - 9
        }`
      );
    }
    if (keyType === "left") {
      nextColumn = numIdx - i;
      box = document.getElementById(
        `row${rowIdx + 1} column${nextColumn > 0 ? nextColumn : nextColumn + 9}`
      );
    }
    if (box) {
      break;
    }
  }
  return box;
};

// WHEN USER USES ARROWKEYS UP OR DOWN
export const getNextYBox = (
  rowIdx: number,
  numIdx: number,
  keyType: "up" | "down"
) => {
  let nextRow;
  let box;
  for (let i = 0; i < 9; i++) {
    if (keyType === "up") {
      nextRow = rowIdx - i;
      box = document.getElementById(
        `row${nextRow > 0 ? nextRow : nextRow + 9} column${numIdx + 1}`
      );
    }
    if (keyType === "down") {
      nextRow = rowIdx + 2 + i;
      box = document.getElementById(
        `row${nextRow < 10 ? nextRow : nextRow - 9} column${numIdx + 1}`
      );
    }
    if (box) {
      break;
    }
  }
  return box;
};

// START GAME
export const startGame = (
  coolTemplate: React.MutableRefObject<number[][]>,
  setHotTemplate: React.Dispatch<React.SetStateAction<number[][] | null>>
) => {
  generateSudoku().then((initialTemplate) => {
    coolTemplate.current = initialTemplate;
    setHotTemplate(initialTemplate);
  });
};
