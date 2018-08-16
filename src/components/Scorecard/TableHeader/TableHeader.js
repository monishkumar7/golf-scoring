import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  tableHeader: {
    display: "inline-block",
    boxSizing: "border-box",
    padding: "0 0 5px 0",
    margin: "0",
    width: "60px",
    textAlign: "center",
    background: "#fff"
  },
  title: {
    fontSize: "14px",
    fontWeight: "bold",
    background: "#bdd4de",
    margin: "0 0 5px 0",
    padding: "5px 0",
    textTransform: "uppercase"
  },
  text: {
    fontWeight: "bold",
    fontSize: "20px"
  },
  textDiv: {
    fontSize: "12px",
    padding: "8px 0 2px 0"
  },
  summary: {
    width: "195px"
  }
};

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
    <Grid item>
      <Typography variant="body1" className={props.classes.title}>
        {props.title}
      </Typography>
      <Typography variant="headline">{contentDiv}</Typography>
    </Grid>
  );
};

export default withStyles(styles)(tableHeader);
