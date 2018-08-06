import React, { Component } from "react";
import { connect } from "react-redux";

import Scorecard from "../Scorecard/Scorecard";
import HoleInput from "../../components/HoleInput/HoleInput";
import classes from "./Scoring.css";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";

class Scoring extends Component {
  componentDidMount = () => {
    const params = new URLSearchParams(this.props.location.search);
    this.setParams(params);

    const loginToken = localStorage.getItem("loginToken");
    const eventId = localStorage.getItem("eventId");
    this.props.onAuthStart(loginToken);
    this.props.onUpdateEventId(eventId);
    this.props.onFetchScores(eventId, loginToken);
  };

  setParams = params => {
    localStorage.setItem("loginToken", params.get("loginToken"));
    localStorage.setItem("eventId", params.get("eventId"));
  };

  submitScore = () => {
    this.props.history.push("/submitSuccess");
    this.props.onSubmitClicked();
  };

  render() {
    const holeInput = this.props.holesArray.map(hole => {
      return (
        <HoleInput
          key={hole.id}
          holeNumber={hole.id}
          name={hole.id}
          par={hole.par}
          value={hole.value}
          difficulty={hole.difficulty}
          changed={event =>
            this.props.onInputChanged(hole.id, event.target.value)
          }
        />
      );
    });

    let authContent = "Please Login to Continue!";
    let sourceStatus = this.props.userName;
    if (this.props.isAppMode)
      sourceStatus = "App Login - " + this.props.userName;
    if (this.props.isLoggedIn) {
      authContent = (
        <div className={classes.Scoring}>
          <Scorecard
            total={this.props.total}
            total1={this.props.total1}
            total2={this.props.total2}
            holesArray={this.props.holesArray}
          />
          <div style={{ margin: "20px auto", width: "90%" }}>
            User Input <br />
            {holeInput}
          </div>
          <Button disabled={false} clicked={this.props.onResetClicked}>
            Reset Score
          </Button>
          <Button disabled={false} clicked={this.submitScore}>
            Submit Score
          </Button>
          <p>{sourceStatus}</p>
        </div>
      );
    }
    return authContent;
  }
}

const mapStateToProps = state => {
  return {
    holesArray: state.scores.holesArray,
    total1: state.scores.total1,
    total2: state.scores.total2,
    total: state.scores.total,
    isLoggedIn: state.auth.isLoggedIn,
    isAppMode: state.auth.appMode,
    userName: state.auth.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChanged: (holeNumber, holeScore) =>
      dispatch(actionCreators.inputChangeUpdate(holeNumber, holeScore)),
    onResetClicked: () => {
      let confirmation = window.confirm("Are you sure?");
      if (confirmation) dispatch(actionCreators.resetScoreUpdate());
    },
    onAuthStart: loginToken => dispatch(actionCreators.authStart(loginToken)),
    onSubmitClicked: () => dispatch(actionCreators.submitScore()),
    onUpdateEventId: eventId => dispatch(actionCreators.updateEventId(eventId)),
    onFetchScores: (eventId, loginToken) =>
      dispatch(actionCreators.fetchScores(eventId, loginToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoring);
