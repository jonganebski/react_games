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
    color: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
