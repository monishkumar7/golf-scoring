import React, { Component, Fragment } from "react";
import { Grid, Button, Typography, withStyles } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import * as actionCreators from "../../store/actions";

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

class Home extends Component {
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };

  createScorecardHandler = () => {
    this.props.onCreateScorecard();
    this.setRedirect();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container alignContent="center" className={classes.homeContainer}>
        {this.props.isLoading ? (
          <Grid item xs={12}>
            <LoadingSpinner />
          </Grid>
        ) : (
          <Fragment>
            {this.renderRedirect()}
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
            {this.props.currentScorecardId ? (
              <Grid item xs={12} className={classes.buttonDiv}>
                <Link to="/scoring" className={classes.linkText}>
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
            ) : (
              <Grid item xs={12} className={classes.buttonDiv}>
                <Link to="/scoring/newgame" className={classes.linkText}>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                    onClick={this.createScorecardHandler}
                  >
                    <Typography variant="button" color="inherit">
                      New Game
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            )}
          </Fragment>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.scores.isLoading,
    currentScorecardId: state.scores.currentScorecard.scorecardId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateScorecard: () => dispatch(actionCreators.createScorecard())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
