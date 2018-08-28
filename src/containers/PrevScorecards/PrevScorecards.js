import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import PrevScorecard from "./PrevScorecard/PrevScorecard";

class PrevScorecards extends Component {
  render() {
    const scorecards = this.props.scorecards.map(scorecard => (
      <Grid item xs={12} key={scorecard.eventId}>
        <PrevScorecard
          total={scorecard.total}
          total1={scorecard.total1}
          total2={scorecard.total2}
          holesArray={scorecard.holesArray}
          id={scorecard.eventId}
        />
      </Grid>
    ));
    return (
      <Fragment>
        <Grid container>{scorecards}</Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    scorecards: state.scores.previousGames
  };
};

export default connect(mapStateToProps)(PrevScorecards);