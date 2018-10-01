import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import Scorecard from "../../components/Scorecard/Scorecard";
import HoleInput from "../../components/HoleInput/HoleInput";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

class Scoring extends Component {
  state = {
    holeCoords: [
      {
        holeNumber: 1,
        latitude: 43.566767,
        longitude: -83.524522
      },
      {
        holeNumber: 2,
        latitude: 43.566767,
        longitude: -23.524522
      },
      {
        holeNumber: 3,
        latitude: 63.566767,
        longitude: -83.524522
      },
      {
        holeNumber: 4,
        latitude: 53.566767,
        longitude: -83.524522
      },
      {
        holeNumber: 5,
        latitude: 33.566767,
        longitude: -83.524522
      },
      {
        holeNumber: 6,
        latitude: 23.566767,
        longitude: -83.524522
      }
    ],
    distance: ""
  };
  componentDidMount = () => {
    if (this.props.scorecardId)
      this.props.onFetchScorecard(this.props.scorecardId);
  };

  resetHandler = () => {
    let confirmation = window.confirm(
      "Are you sure you want to reset the scorecard?"
    );
    if (confirmation) this.props.onResetScorecard(this.props.scorecardId);
  };

  submitHandler = () => {
    let allValuesFilled = true;
    let allEmptyCounter = 0;

    for (let hole of this.props.holesArray)
      if (hole.score === "") {
        allValuesFilled = false;
        allEmptyCounter++;
      }
    if (allEmptyCounter >= 18) {
      window.alert(
        "You cannot submit an empty scorecard. Please fill up values"
      );
    } else if (!allValuesFilled) {
      let confirmation2 = window.confirm(
        "All hole values are not filled. Are you sure you want to Submit an incomplete scorecard?"
      );
      if (confirmation2) this.props.onSubmitScorecard(this.props.scorecardId);
    } else {
      let confirmation = window.confirm(
        "Are you sure you want to submit the scorecard?"
      );
      if (confirmation) this.props.onSubmitScorecard(this.props.scorecardId);
    }
  };

  distanceBetween = (lat1, lon1, lat2, lon2, unit) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "Y") {
      dist = dist * 1760;
    }
    return dist;
  };

  getDistance = holeNumber => {
    let hole = this.state.holeCoords.find(obj => {
      return obj.holeNumber === holeNumber;
    });
    navigator.geolocation.getCurrentPosition(data => {
      let distanceCalc = this.distanceBetween(
        data.coords.latitude,
        data.coords.longitude,
        hole.latitude,
        hole.longitude,
        "Y"
      );
      console.log(distanceCalc);
      console.log("Accurate to", data.coords.accuracy * 1.09361, "yards");
      this.setState({ distance: distanceCalc });
    });
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
          getDistance={() => {
            this.getDistance(hole.number);
          }}
          distance={this.state.distance}
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
          {this.props.loading ? (
            <Grid item xs={12}>
              <LoadingSpinner />
            </Grid>
          ) : (
            <Fragment>
              <Grid container>{holeInput}</Grid>
              <Grid container justify="center" style={{ padding: "2rem" }}>
                <Button disabled={false} clicked={this.resetHandler}>
                  Reset Scorecard
                </Button>
                <Button disabled={false} clicked={this.submitHandler}>
                  Submit Scorecard
                </Button>
              </Grid>
            </Fragment>
          )}
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
    redirect: state.scores.redirectPath,
    loading: state.scores.loading
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
      dispatch(actionCreators.submitScorecard(scorecardId)),
    onFetchScorecard: scorecardId =>
      dispatch(actionCreators.fetchCurrentScorecard(scorecardId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoring);
