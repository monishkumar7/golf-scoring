import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./App.css";
import Scoring from "../Scoring/Scoring";
import PrevScorecards from "../../containers/PrevScorecards/PrevScorecards";
import Layout from "../../components/Layout/Layout";
import Home from "../Home/Home";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import * as actionCreators from "../../store/actions";

class App extends Component {
  componentDidMount = () => {
    const params = new URLSearchParams(window.location.search);
    this.props.onCheckAuthState(params.get("loginToken"));
  };

  render() {
    const loadingSpinner = this.props.isAuthLoading ? <LoadingSpinner /> : null;
    const content = this.props.auth ? (
      <div className={classes.App}>
        <Layout auth={this.props.auth} userName={this.props.userName}>
          {loadingSpinner}
          <Switch>
            <Route path="/prev" component={PrevScorecards} />
            <Route path="/scoring" component={Scoring} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </div>
    ) : (
      <p>Please Login to continue!</p>
    );

    return content;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.loginToken !== null,
    userName: state.auth.userName,
    isAuthLoading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: urlToken =>
      dispatch(actionCreators.checkAuthState(urlToken))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
