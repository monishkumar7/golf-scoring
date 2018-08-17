import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  tableHeader: {
    display: "inline-block",
    boxSizing: "border-box",
    padding: "0 0 5px 0",
    margin: "0",
    width: "14%",
    textAlign: "center",
    background: "#fff"
  },
  title: {
    fontSize: "14px",
    fontWeight: "bold",
    background: theme.palette.primary.main,
    color: "#fff",
    margin: "0 0 5px 0",
    padding: "5px 0",
    textTransform: "uppercase"
  },
  text: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "27px"
  },
  textDiv: {
    fontSize: "12px",
    padding: "8px 0 2px 0"
  },
  summary: {
    width: "50%"
  }
});

const tableHeader = props => {
  let content = "-";
  let divClasses = [props.classes.tableHeader];
  if (props.content !== "") {
    content = props.content;
  }
  let contentDiv = (
    <Typography variant="body1" className={props.classes.text}>
      {content}
    </Typography>
  );
  if (props.text) {
    contentDiv = (
      <Typography variant="body1" className={props.classes.textDiv}>
        {content}
      </Typography>
    );
  }
  if (props.summary) {
    divClasses.push(props.classes.summary);
  }
  return (
    <div className={divClasses.join(" ")}>
      <Typography variant="body1" className={props.classes.title}>
        {props.title}
      </Typography>
      <Typography variant="headline">{contentDiv}</Typography>
    </div>
  );
};

export default withStyles(styles)(tableHeader);
