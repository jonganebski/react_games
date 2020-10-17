import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Minesweeper from "./Components/Minesweeper";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/minesweeper" component={Minesweeper} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
