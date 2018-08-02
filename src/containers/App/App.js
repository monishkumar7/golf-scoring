import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Scoring from "../Scoring/Scoring";

class App extends Component {
  render() {
    return <Route path="/" component={Scoring} />;
  }
}

export default App;
