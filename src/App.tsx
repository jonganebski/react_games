import React from "react";
import Minesweeper from "./Components/Minesweeper";
import { reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Home from "./Components/Home";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Minesweeper /> */}
      <Home />
    </>
  );
}

export default App;
