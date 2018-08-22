import React, { Component, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";
import { connect } from "react-redux";

import PrevScorecard from "./PrevScorecard/PrevScorecard";

class PrevScorecards extends Component {
  render() {
    const scorecards = this.props.scorecards.map(scorecard => (
      <Grid item xs={12} key={scorecard.eventId}>
        <Card style={{ padding: "1rem", margin: "1rem" }}>
          <PrevScorecard title={scorecard.title} id={scorecard.eventId} />
        </Card>
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
