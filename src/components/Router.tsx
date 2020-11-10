import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Minesweeper from "routes/Minesweeper";
import NewMinesweeper from "routes/NewMinesweeper";
import Sudoku from "routes/Sudoku";
import Tetris from "routes/Tetris";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/minesweeper" component={Minesweeper} />
        <Route path="/new-minesweeper" component={NewMinesweeper} />
        <Route path="/sudoku" component={Sudoku} />
        <Route path="/tetris" component={Tetris} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
