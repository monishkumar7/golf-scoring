import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  IconButton,
  Collapse
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Scorecard from '../../../components/Scorecard/Scorecard';
import * as actionCreators from '../../../store/actions';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';

const styles = theme => ({
  scorecard: {
    margin: '.4rem 1rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  cardDate: {
    textAlign: 'center'
  },
  cardIcon: {
    textAlign: 'right'
  },
  collapse: {
    padding: '0'
  },
  cardHeader: {
    padding: '1rem'
  }
});

class PrevScorecard extends Component {
  state = {
    expanded: false,
    fetched: false
  };

  handleExpandClick = scorecardId => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
    if (!this.state.fetched) {
      this.props.onFetchPreviousScorecard(scorecardId);
      this.setState(prevState => ({ fetched: true }));
    }
  };

  render() {
    const { classes } = this.props;
    const scorecard = (
      <Scorecard
        total={this.props.total}
        total1={this.props.total1}
        total2={this.props.total2}
        holesArray={this.props.holesArray}
      />
    );
    return (
      <Card className={classes.scorecard}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.cardHeader}
        >
          <Grid item xs={7}>
            <Typography variant="subheading">
              Game {this.props.index}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.cardDate}>
            <Typography variant="body1">
              {new Date(this.props.lastUpdatedTime).toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.cardIcon}>
            <IconButton
              className={[
                classes.expand,
                this.state.expanded ? [classes.expandOpen] : null
              ].join(' ')}
              onClick={() => {
                this.handleExpandClick(this.props.id);
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
        {this.props.loading ? (
          <LoadingSpinner />
        ) : (
          <Collapse
            in={this.state.expanded}
            timeout="auto"
            className={classes.collapse}
          >
            {scorecard}
          </Collapse>
        )}
      </Card>
    );
  }
}

const mapDispatchWithProps = dispatch => {
  return {
    onFetchPreviousScorecard: scorecardId =>
      dispatch(actionCreators.fetchPreviousScorecard(scorecardId))
  };
};

export default connect(
  null,
  mapDispatchWithProps
)(withStyles(styles)(PrevScorecard));
