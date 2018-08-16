import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  holeNumber: {
    fontSize: "14px",
    fontWeight: "200",
    background: "#bdd4de",
    margin: "0 0 5px 0",
    padding: "5px"
  },
  holeScore: {
    display: "inline-block",
    boxSizing: "border-box",
    padding: "0 0 5px 0",
    margin: "0",
    textAlign: "center",
    background: "#fff"
  },
  score: {
    fontSize: "20px"
  }
};

const holeScore = props => {
  let holeScore = "-";
  if (props.touched) {
    holeScore = props.holeScore;
  }
  return (
    <Grid item className={props.classes.holeScore}>
      <Typography variant="body1" className={props.classes.holeNumber}>
        {props.holeNumber}
      </Typography>
      <Typography variant="headline" className={props.classes.score}>
        {holeScore}
      </Typography>
    </Grid>
    // <div className={classes.HoleScore}>
    //   <div className={classes.Number}>{props.holeNumber}</div>
    //   <div className={classes.Score}>{holeScore}</div>
    // </div>
  );
};

export default withStyles(styles)(holeScore);
