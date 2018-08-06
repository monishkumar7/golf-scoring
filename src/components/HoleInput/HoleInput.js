import React from "react";

import classes from "./HoleInput.css";
import Input from "../UI/Input/Input";

const holeInput = props => {
  return (
    <div className={classes.HoleInput}>
      <p className={classes.HoleNumber}>Hole - {props.holeNumber}</p>
      <Input
        name={props.name}
        value={props.value}
        type="number"
        changed={props.changed}
      />
      <div className={classes.HoleDetails}>
        <p>Par - {props.par}</p>
        <p>Difficulty - {props.difficulty}</p>
      </div>
    </div>
  );
};

export default holeInput;
