import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import PrevScorecard from './PrevScorecard/PrevScorecard';

const styles = () => ({
  backLink: {
    textDecoration: 'none'
  },
  topLine: {
    padding: '1rem'
  }
});
class PrevScorecards extends Component {
  render() {
    const { classes } = this.props;
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
    return (
      <Grid container>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.topLine}
        >
          <Grid item>
            <Link to="/" className={classes.backLink}>
              <Button variant="outlined">
                <Typography variant="button">Go Back</Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="body1">Total Games - {totalLength}</Typography>
          </Grid>
        </Grid>
        {scorecards}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.scores.loading,
    prevScorecards: state.scores.previousScorecards
  };
};
export default connect(mapStateToProps)(withStyles(styles)(PrevScorecards));
