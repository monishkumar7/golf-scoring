import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import PrevScorecard from './PrevScorecard/PrevScorecard';

class PrevScorecards extends Component {
  render() {
    const totalLength = this.props.prevScorecards.length;
    const scorecards = this.props.prevScorecards.map((scorecard, index) => (
      <Grid item xs={12} key={scorecard.scorecardId}>
        <PrevScorecard
          total={scorecard.total}
          total1={scorecard.total1}
          total2={scorecard.total2}
          holesArray={scorecard.holesArray}
          id={scorecard.scorecardId}
          index={totalLength - index}
          loading={scorecard.isLoading}
          lastUpdatedTime={scorecard.lastUpdatedTime}
        />
      </Grid>
    ));
    return <Grid container>{scorecards}</Grid>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.scores.loading,
    prevScorecards: state.scores.previousScorecards
  };
};
export default connect(mapStateToProps)(PrevScorecards);
