import React from "react";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
  }
`;

function App() {
  // const baseArr = Array.from(Array(81).keys());
  const arr2D: number[][] = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
  ];

  const getEachRowSubBox = (
    initialRowIdx: number,
    a: number,
    b: number,
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
    subBox: number[][]
  ) => {
    if (numIdx < 3) {
      getEachRowSubBox(initialRowIdx, 0, 3, subBox);
    } else if (numIdx < 6) {
      getEachRowSubBox(initialRowIdx, 3, 6, subBox);
    } else {
      getEachRowSubBox(initialRowIdx, 6, 9, subBox);
    }
  };

  const getSubBox = (rowIdx: number, numIdx: number) => {
    const subBox: number[][] = [];
    if (rowIdx < 3) {
      getSubBoxAction(0, numIdx, subBox);
    } else if (rowIdx < 6) {
      getSubBoxAction(3, numIdx, subBox);
    } else {
      getSubBoxAction(6, numIdx, subBox);
    }
    return subBox.flat();
  };

  const findEmpty = () => {
    const row = arr2D.find((row) => row.includes(0));
    const rowIdx = arr2D.findIndex((r) => r === row);
    if (row) {
      const numIdx = row.findIndex((num) => num === 0);
      return { rowIdx, numIdx };
    } else {
      return { rowIdx, numIdx: null };
    }
  };

  const validator = (rowIdx: number, numIdx: number, n: number) => {
    const row = arr2D[rowIdx];
    const column: number[] = [];
    const subBox = getSubBox(rowIdx, numIdx);
    arr2D.forEach((row) => column.push(row[numIdx]));
    const numSet = new Set(row.concat(column, subBox));
    if (numSet.has(n)) {
      return false;
    } else {
      return true;
    }
  };

  // -------------------------------------------------
  let limit = 0;
  const solve = () => {
    limit++;
    if (limit === 800) {
      return true;
    }
    const { rowIdx, numIdx } = findEmpty();
    console.log(rowIdx, numIdx);
    if (numIdx !== null) {
      for (let n = 1; n < 10; n++) {
        const isValid = validator(rowIdx, numIdx, n);
        if (isValid) {
          arr2D[rowIdx].splice(numIdx, 1, n);
          const isFinished = solve();
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

  solve();

  return (
    <>
      <GlobalStyle />
      {/* <Router /> */}
      <div
        style={{
          backgroundColor: "black",
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: "1px",
          width: "min-content",
        }}
      >
        {arr2D.flat().map((num, i) => (
          <div
            key={i}
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            {num === 0 ? "" : num}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
