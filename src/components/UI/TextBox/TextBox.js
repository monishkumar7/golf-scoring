import React from "react";

import classes from "./TextBox.css";

const textBox = props => {
  return (
    <div className={classes.TextBox}>
      <input
        type={props.type}
        onChange={props.changed}
        name={props.name}
        value={props.value}
      />
    </div>
  );
};

export default textBox;
