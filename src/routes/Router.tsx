import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Minesweeper from "components/Minesweeper/Minesweeper";
import Sudoku from "components/Sudoku";
import Tetris from "components/Tetris";

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
