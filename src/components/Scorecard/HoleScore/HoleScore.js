import React from "react";
import { Typography } from "@material-ui/core";
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
    width: "8%",
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
    <div className={props.classes.holeScore}>
      <Typography variant="body1" className={props.classes.holeNumber}>
        {props.holeNumber}
      </Typography>
      <Typography variant="headline" className={props.classes.score}>
        {holeScore}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(holeScore);
