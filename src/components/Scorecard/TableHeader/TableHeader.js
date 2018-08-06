import React from "react";

import classes from "./TableHeader.css";

const tableHeader = props => {
  let content = "-";
  let divClasses = [classes.TableHeader];
  if (props.content !== "") {
    content = props.content;
  }
  let contentDiv = <div className={classes.Text}>{content}</div>;
  if (props.text) {
    contentDiv = <div className={classes.TextDiv}>{content}</div>;
  }
  if (props.summary) {
    divClasses.push(classes.Summary);
  }
  return (
    <div className={divClasses.join(" ")}>
      <div className={classes.Title}>{props.title}</div>
      {contentDiv}
    </div>
  );
};

export default tableHeader;
