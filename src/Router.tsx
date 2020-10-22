import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Minesweeper from "./Components/Minesweeper/Minesweeper";
import Sudoku from "./Components/Sudoku";
import Tetris from "./Components/Tetris";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/minesweeper" component={Minesweeper} />
        <Route path="/sudoku" component={Sudoku} />
        <Route path="/tetris" component={Tetris} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
