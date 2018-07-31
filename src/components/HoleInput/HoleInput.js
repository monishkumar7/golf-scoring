import React from "react";

import classes from "./HoleInput.css";
import Input from "../UI/Input/Input";

const holeInput = props => {
  return (
    <div className={classes.HoleInput}>
      <p>Hole #{props.holeNumber}</p>
      <Input
        name={props.name}
        value={props.value}
        type="number"
        changed={props.changed}
      />
      <p>Par - {props.par}</p>
    </div>
  );
};

export default holeInput;
