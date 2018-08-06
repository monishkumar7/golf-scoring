import React from "react";

import classes from "./Text.css";

const total = props => {
  let value = "-";
  if (props.value !== "") {
    value = props.value;
  }
  return (
    <div className={classes.Total}>
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Value}>{value}</div>
    </div>
  );
};

export default total;
