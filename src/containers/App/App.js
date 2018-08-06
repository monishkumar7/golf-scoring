import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import classes from "./App.css";
import Scoring from "../Scoring/Scoring";
import Login from "../../components/Login/Login";
import SubmitSuccess from "../../components/SubmitSuccess/SubmitSuccess";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/scores" component={Scoring} />
          <Route path="/submitSuccess" component={SubmitSuccess} />
        </Switch>
      </div>
    );
  }
}

export default App;
