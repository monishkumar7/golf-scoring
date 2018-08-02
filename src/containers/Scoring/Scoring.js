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
    const loginToken = params.get("loginToken");
    const eventId = params.get("eventId");
    this.props.onAuthStart(loginToken);
    this.props.onUpdateEventId(eventId);
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
            this.props.onInputChanged(event.target.value, hole.id)
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
          <div className={classes.Scorecard}>
            <Scorecard
              total={this.props.total}
              total1={this.props.total1}
              total2={this.props.total2}
              holesArray={this.props.holesArray}
            />
          </div>
          <div style={{ margin: "20px auto", width: "90%" }}>
            User Input <br />
            {holeInput}
          </div>
          <Button disabled={false} clicked={this.props.onResetClicked}>
            Reset Score
          </Button>
          <Button disabled={false} clicked={this.props.onSubmitClicked}>
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
    onInputChanged: (score, id) =>
      dispatch(actionCreators.inputChange(score, id)),
    onResetClicked: () => {
      let confirmation = window.confirm("Are you sure?");
      if (confirmation) dispatch(actionCreators.resetScore());
    },
    onAuthStart: loginToken => dispatch(actionCreators.authStart(loginToken)),
    onSubmitClicked: () => dispatch(actionCreators.submitScore()),
    onUpdateEventId: eventId => dispatch(actionCreators.updateEventId(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoring);
