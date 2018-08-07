import React from "react";

import classes from "./FormInput.css";

const formInput = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.touched && props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default formInput;
