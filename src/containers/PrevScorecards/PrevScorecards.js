import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import PrevScorecard from "./PrevScorecard/PrevScorecard";

class PrevScorecards extends Component {
  render() {
    const scorecards = this.props.prevScorecards.map((scorecard, index) => (
      <Grid item xs={12} key={scorecard.scorecardId}>
        <PrevScorecard
          total={scorecard.total}
          total1={scorecard.total1}
          total2={scorecard.total2}
          holesArray={scorecard.holesArray}
          id={scorecard.scorecardId}
          index={index}
          lastUpdatedTime={scorecard.lastUpdatedTime}
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
    prevScorecards: state.scores.previousScorecards
  };
};
export default connect(mapStateToProps)(PrevScorecards);
