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
  }
};

const home = props => {
  const { classes } = props;
  return (
    <Grid container>
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
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          <Typography variant="button" color="inherit">
            Continue unfinished Game
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.buttonDiv}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          <Typography variant="button" color="inherit">
            New Game
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(home);
