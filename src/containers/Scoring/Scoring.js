import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import Scorecard from "../../components/Scorecard/Scorecard";
import HoleInput from "../../components/HoleInput/HoleInput";
import classes from "./Scoring.css";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";

class Scoring extends Component {
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };

  resetHandler = () => {
    let confirmation = window.confirm(
      "Are you sure you want to reset the scorecard?"
    );
    if (confirmation) this.props.onResetScorecard(this.props.scorecardId);
  };

  submitHandler = () => {
    let confirmation = window.confirm(
      "Are you sure you want to submit the scorecard?"
    );
    if (confirmation) {
      this.props.onSubmitScorecard(this.props.scorecardId);
      this.setRedirect();
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
        <div className={classes.Scoring}>
          {this.renderRedirect()}
          <Scorecard
            total={this.props.total}
            total1={this.props.total1}
            total2={this.props.total2}
            holesArray={this.props.holesArray}
          />
          <Grid container>{holeInput}</Grid>
          <Button disabled={false} clicked={this.resetHandler}>
            Reset Scorecard
          </Button>
          <Button disabled={false} clicked={this.submitHandler}>
            Submit Scorecard
          </Button>
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
    auth: state.auth.auth
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
