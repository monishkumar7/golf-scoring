import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./App.css";
import Scoring from "../Scoring/Scoring";
import PrevScorecards from "../../containers/PrevScorecards/PrevScorecards";
import Layout from "../../components/Layout/Layout";
import * as actionCreators from "../../store/actions";
import Home from "../../components/Home/Home";

class App extends Component {
  componentDidMount = () => {
    const params = new URLSearchParams(window.location.search);
    this.setParams(params);

    const loginToken = localStorage.getItem("loginToken");
    const eventId = localStorage.getItem("eventId");
    this.props.onAppLogin(loginToken);
    this.props.onUpdateEventId(eventId);
  };

  setParams = params => {
    localStorage.setItem("loginToken", params.get("loginToken"));
    localStorage.setItem("eventId", params.get("eventId"));
  };

  render() {
    return (
      <div className={classes.App}>
        <Layout auth={this.props.auth} userName={this.props.userName}>
          <Switch>
            <Route path="/prev" component={PrevScorecards} />
            <Route path="/scores" component={Scoring} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    userName: state.auth.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAppLogin: loginToken => dispatch(actionCreators.appLogin(loginToken)),
    onUpdateEventId: eventId => dispatch(actionCreators.updateEventId(eventId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
