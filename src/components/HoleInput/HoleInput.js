import React, { Fragment } from 'react';
import { Grid, Typography, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Button from '../UI/Button/Button';

const styles = theme => ({
  holeScore: {
    padding: '0.4rem 0.9rem'
  },
  card: {
    padding: '10px 10px 20px',
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
  cardLine: {
    border: '.7px solid #eee'
  },
  scoringButtons: {
    margin: '2rem 0 1rem'
  },
  distanceButton: {
    padding: '1rem 0'
  },
  distanceInfo: {
    textAlign: 'center'
  },
  distanceInfoHR: {
    border: '.9px solid #eee',
    width: '30%'
  }
});

const HoleScore = props => {
  const { classes } = props;
  let holeScore = '-';
  if (props.touched) {
    holeScore = props.score;
  }

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
        <hr className={classes.cardLine} />
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.scoringButtons}
        >
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
        <Grid container justify="center">
          <Grid item className={classes.distanceInfo}>
            {props.locationFetching ? (
              <p>Fetching Location...</p>
            ) : props.distance ? (
              <Fragment>
                <Typography variant="body1">
                  Distance to Hole {props.number}
                </Typography>
                <hr className={classes.distanceInfoHR} />
                <Typography variant="headline">
                  {props.distance} yards
                </Typography>
                <Typography variant="caption">
                  (Accurate to {props.accuracy} yards)
                </Typography>
              </Fragment>
            ) : null}
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.distanceButton}>
          <Button type="distanceButton" clicked={props.getDistance}>
            Get Distance to Hole
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(HoleScore);
