import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Scorecard from "../../components/Scorecard/Scorecard";
import HoleInput from "../../components/HoleInput/HoleInput";
import classes from "./Scoring.css";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";

class Scoring extends Component {
  componentDidMount = () => {
    this.props.onFetchScores();
  };

  render() {
    const holeInput = this.props.holesArray.map(hole => {
      return (
        <HoleInput
          key={hole.id}
          number={hole.id}
          par={hole.par}
          score={hole.value}
          difficulty={hole.difficulty}
          touched={hole.touched}
          scoreClicked={() => {
            this.props.onTouchScoreUpdate(hole.id, hole.par, true);
          }}
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
          <Grid container>{holeInput}</Grid>
          <Button disabled={false} clicked={this.props.onResetClicked}>
            Reset Score
          </Button>
          <Button disabled={false}>Submit Score</Button>
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
    onResetClicked: () => {
      let confirmation = window.confirm("Are you sure?");
      if (confirmation) dispatch(actionCreators.resetScore());
    },
    onIncrementScore: (holeNumber, holeScore) =>
      dispatch(actionCreators.incrementScore(holeNumber, holeScore)),
    onDecrementScore: (holeNumber, holeScore) =>
      dispatch(actionCreators.decrementScore(holeNumber, holeScore)),
    onFetchScores: () => dispatch(actionCreators.fetchScores()),
    onTouchScoreUpdate: (holeNumber, holeScore, touched) =>
      dispatch(actionCreators.scoreUpdate(holeNumber, holeScore, touched))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoring);
