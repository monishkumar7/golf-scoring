import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import classes from "./App.css";
import Scoring from "../Scoring/Scoring";
import Login from "../../components/Login/Login";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/scores" component={Scoring} />
        </Switch>
      </div>
    );
  }
}

export default App;
