import React from "react";

import classes from "./HoleScore.css";
import Button from "../UI/Button/Button";

const HoleScore = props => {
  return (
    <div className={classes.HoleScore}>
      Hole - {props.number}
      <br />
      <Button clicked={props.decrement}>-</Button>
      <h4>{props.score}</h4>
      <Button clicked={props.increment}>+</Button>
      <br />
      Par - {props.par}
      <br />
      Difficulty - {props.difficulty}
    </div>
  );
};

export default HoleScore;
