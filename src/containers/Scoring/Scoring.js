import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import Scorecard from "../../components/Scorecard/Scorecard";
import HoleInput from "../../components/HoleInput/HoleInput";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";

class Scoring extends Component {
  resetHandler = () => {
    let confirmation = window.confirm(
      "Are you sure you want to reset the scorecard?"
    );
    if (confirmation) this.props.onResetScorecard(this.props.scorecardId);
  };

  submitHandler = () => {
    let allValuesFilled = true;
    let confirmation = window.confirm(
      "Are you sure you want to submit the scorecard?"
    );
    if (confirmation) {
      for (let hole of this.props.holesArray)
        if (hole.score === "") allValuesFilled = false;
      if (!allValuesFilled) {
        let confirmation2 = window.confirm(
          "All hole values are not filled. Are you sure you want to Submit an incomplete scorecard?"
        );
        if (confirmation2) this.props.onSubmitScorecard(this.props.scorecardId);
      } else {
        this.props.onSubmitScorecard(this.props.scorecardId);
      }
    }
  };

  render() {
    const holeInput = this.props.holesArray.map(hole => {
      return (
        <HoleInput
          key={hole.number}
          number={hole.number}
          par={hole.par}
          score={hole.score}
          difficulty={hole.difficulty}
          touched={hole.touched}
          scoreClicked={() => {
            this.props.onTouchUpdateScore(
              this.props.scorecardId,
              hole.number,
              hole.par,
              true
            );
          }}
          decrement={() => {
            this.props.onDecrementScore(
              this.props.scorecardId,
              hole.number,
              hole.score
            );
          }}
          increment={() => {
            this.props.onIncrementScore(
              this.props.scorecardId,
              hole.number,
              hole.score
            );
          }}
        />
      );
    });

    let authContent = "Please Login to Continue!";
    if (this.props.auth) {
      authContent = (
        <div>
          {this.props.redirect === "/home" ? <Redirect to="/home" /> : null}
          <Scorecard
            total={this.props.total}
            total1={this.props.total1}
            total2={this.props.total2}
            holesArray={this.props.holesArray}
          />
          <Grid container>{holeInput}</Grid>
          <Grid container justify="center" style={{ padding: "2rem" }}>
            <Button disabled={false} clicked={this.resetHandler}>
              Reset Scorecard
            </Button>
            <Button disabled={false} clicked={this.submitHandler}>
              Submit Scorecard
            </Button>
          </Grid>
        </div>
      );
    }
    return authContent;
  }
}

const mapStateToProps = state => {
  return {
    scorecardId: state.scores.currentScorecard.scorecardId,
    holesArray: state.scores.currentScorecard.holesArray,
    total1: state.scores.currentScorecard.total1,
    total2: state.scores.currentScorecard.total2,
    total: state.scores.currentScorecard.total,
    auth: state.auth.loginToken !== null,
    redirect: state.scores.redirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetScorecard: scorecardId =>
      dispatch(actionCreators.resetScorecard(scorecardId)),
    onIncrementScore: (scorecardId, holeNumber, holeScore) =>
      dispatch(
        actionCreators.incrementScore(scorecardId, holeNumber, holeScore)
      ),
    onDecrementScore: (scorecardId, holeNumber, holeScore) =>
      dispatch(
        actionCreators.decrementScore(scorecardId, holeNumber, holeScore)
      ),
    onTouchUpdateScore: (scorecardId, holeNumber, holeScore, touched) =>
      dispatch(
        actionCreators.updateScore(scorecardId, holeNumber, holeScore, touched)
      ),
    onSubmitScorecard: scorecardId =>
      dispatch(actionCreators.submitScorecard(scorecardId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoring);
