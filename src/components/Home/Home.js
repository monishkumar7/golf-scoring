import React, { Fragment } from "react";
import { Grid, Button, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const styles = {
  buttonDiv: {
    textAlign: "center",
    margin: "0.5rem"
  },
  button: {
    width: "250px"
  },
  linkText: {
    textDecoration: "none"
  },
  homeContainer: {
    height: "50vh"
  }
};

const home = props => {
  const { classes } = props;
  return (
    <Grid container alignContent="center" className={classes.homeContainer}>
      {props.isLoading ? (
        <Grid item xs={12}>
          <LoadingSpinner />
        </Grid>
      ) : (
        <Fragment>
          <Grid item xs={12} className={classes.buttonDiv}>
            <Link to="/prev" className={classes.linkText}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
              >
                <Typography variant="button" color="inherit">
                  View Prev Scores
                </Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} className={classes.buttonDiv}>
            <Link to="/scoring/continue" className={classes.linkText}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
              >
                <Typography variant="button" color="inherit">
                  Continue unfinished Game
                </Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} className={classes.buttonDiv}>
            <Link to="/scoring/newgame" className={classes.linkText}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
              >
                <Typography variant="button" color="inherit">
                  New Game
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.scores.isLoading
  };
};

export default withStyles(styles)(connect(mapStateToProps)(home));
