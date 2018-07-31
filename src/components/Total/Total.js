import React from "react";

import classes from "./Total.css";

const total = props => {
  let total = "-";
  if (props.total !== "") {
    total = props.total;
  }
  return (
    <div className={classes.Total}>
      <div className={classes.Title}>{props.title}</div>
      <hr />
      <div className={classes.TotalValue}>{total}</div>
    </div>
  );
};

export default total;
