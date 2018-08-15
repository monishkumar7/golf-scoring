import React, { Component } from "react";
import { connect } from "react-redux";

import Scorecard from "../../components/Scorecard/Scorecard";
import HoleScore from "../../components/HoleScore/HoleScore";
import classes from "./Scoring.css";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";

class Scoring extends Component {
  submitScore = () => {
    this.props.history.push("/submitSuccess");
    this.props.onSubmitClicked();
  };

  render() {
    const holeInput = this.props.holesArray.map(hole => {
      return (
        <HoleScore
          key={hole.id}
          number={hole.id}
          par={hole.par}
          score={hole.value}
          difficulty={hole.difficulty}
          decrement={() => {
            this.props.onDecrementScore(hole.id, hole.value);
          }}
          increment={() => {
            this.props.onIncrementScore(hole.id, hole.value);
          }}
        />
      );
    });

    let authContent = "Please Login to Continue!";
    if (this.props.auth) {
      authContent = (
        <div className={classes.Scoring}>
          <Scorecard
            total={this.props.total}
            total1={this.props.total1}
            total2={this.props.total2}
            holesArray={this.props.holesArray}
          />
          <div style={{ margin: "20px auto", width: "90%" }}>{holeInput}</div>
          <Button disabled={false} clicked={this.props.onResetClicked}>
            Reset Score
          </Button>
          <Button disabled={false} clicked={this.submitScore}>
            Submit Score
          </Button>
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
    auth: state.auth.auth,
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
    onAppLogin: loginToken => dispatch(actionCreators.appLogin(loginToken)),
    onSubmitClicked: () => dispatch(actionCreators.submitScore()),
    onIncrementScore: (holeNumber, holeScore) =>
      dispatch(actionCreators.incrementScore(holeNumber, holeScore)),
    onDecrementScore: (holeNumber, holeScore) =>
      dispatch(actionCreators.decrementScore(holeNumber, holeScore)),
    onUpdateEventId: eventId => dispatch(actionCreators.updateEventId(eventId)),
    onFetchScores: (eventId, loginToken) =>
      dispatch(actionCreators.fetchScores(eventId, loginToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoring);
