import React, { Component } from "react";
import { Route } from "react-router-dom";

import classes from "./App.css";
import Scoring from "../Scoring/Scoring";
import Login from "../../components/Login/Login";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Route path="/" component={Login} />
        <Route path="/" component={Scoring} />
      </div>
    );
  }
}

export default App;
