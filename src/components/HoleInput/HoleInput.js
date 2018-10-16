import React from 'react';
import { Grid, Typography, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const styles = theme => ({
  holeScore: {
    padding: '0.4rem 0.9rem'
  },
  card: {
    padding: '1rem',
    borderRadius: '0'
  },
  score: {
    display: 'inline-block',
    fontSize: '2.5rem',
    margin: '0 15px',
    width: '3rem',
    textAlign: 'center'
  },
  button: {
    margin: '0 10px',
    minWidth: '45px',
    borderRadius: '0',
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  },
  holeNumber: {
    fontWeight: 'bold',
    fontSize: '25px',
    textTransform: 'uppercase'
  },
  holeDetails: {
    color: '#bbb'
  },
  scoringButtons: {
    margin: '1rem 0',
    padding: '2rem 0',
    backgroundColor: '#fafafa'
  },
  distanceInfo: {
    textAlign: 'center'
  },
  distanceInfoHR: {
    border: '.9px solid #eee',
    width: '30%'
  },
  greenText: {
    color: 'green'
  },
  orangeText: {
    color: 'orange'
  },
  redText: {
    color: 'red'
  }
});

const HoleScore = props => {
  const { classes } = props;
  let holeScore = '-';
  if (props.touched) {
    holeScore = props.score;
  }

  let accuracy = '';
  if (props.accuracy <= 10)
    accuracy = (
      <Typography variant="caption" className={classes.greenText}>
        Very Accurate ({props.accuracy} yards)
      </Typography>
    );
  else if (props.accuracy > 10 && props.accuracy <= 40)
    accuracy = (
      <Typography variant="caption" className={classes.orangeText}>
        Accurate ({props.accuracy} yards)
      </Typography>
    );
  else
    accuracy = (
      <Typography variant="caption" className={classes.redText}>
        Not Very Accurate ({props.accuracy} yards)
      </Typography>
    );
  return (
    <Grid item xs={12} sm={6} lg={4} className={classes.holeScore}>
      <Card className={classes.card}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subheading" className={classes.holeNumber}>
              Hole {props.number}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" className={classes.holeDetails}>
              Par - {props.par}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body1" className={classes.holeDetails}>
              Length - {props.yards} yards
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" className={classes.holeDetails}>
              Difficulty - {props.difficulty}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className={classes.scoringButtons}
        >
          <Grid item>
            <Typography variant="subheading">Your Score</Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Button
                  type="scoreButton"
                  disabled={!props.touched}
                  clicked={props.decrement}
                >
                  -
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  onClick={props.scoreClicked}
                  variant="title"
                  className={props.classes.score}
                >
                  {holeScore}
                </Typography>
              </Grid>
              <Grid item>
                <Button type="scoreButton" clicked={props.increment}>
                  +
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {props.locationFetching ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBottom: '1rem', height: '100px' }}
          >
            <Grid item className={classes.distanceInfo}>
              <LoadingSpinner type="small" />
              Fetching Location
            </Grid>
          </Grid>
        ) : props.distance ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBottom: '1rem', height: '100px' }}
          >
            <Grid item className={classes.distanceInfo}>
              <Typography variant="body1">
                Distance to Hole {props.number}
              </Typography>
              <hr className={classes.distanceInfoHR} />
              <Typography variant="headline">{props.distance} yards</Typography>
              {accuracy}
            </Grid>
          </Grid>
        ) : null}

        <Grid container justify="center">
          <Button type="distanceButton" clicked={props.getDistance}>
            Get Distance to Hole
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(HoleScore);
