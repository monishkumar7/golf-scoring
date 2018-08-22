import React, { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";

const prevScorecard = props => {
  return (
    <Fragment>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={3}>
          <Typography variant="subheading"> {props.title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subheading"> {props.id}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default prevScorecard;
