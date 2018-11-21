import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import Divider from '../UI/Divider/Divider';

const ValueLine = props => {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item>
        <Typography className="">{props.value}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default ValueLine;
