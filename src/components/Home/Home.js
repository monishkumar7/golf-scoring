import React from "react";
import { Grid, Button, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    </Grid>
  );
};

export default withStyles(styles)(home);
