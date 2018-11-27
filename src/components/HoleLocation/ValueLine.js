import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import Divider from '../UI/Divider/Divider';

const ValueLine = props => {
  return (
    <Grid container justify="space-between">
      <Grid item>
        {props.strikethrough ? (
          <Typography style={{ textDecoration: 'line-through' }}>
            {props.oldTitle}
          </Typography>
        ) : (
          ''
        )}
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item>
        {props.strikethrough ? (
          <Typography style={{ textDecoration: 'line-through' }}>
            {props.oldValue}
          </Typography>
        ) : (
          ''
        )}
        {props.color ? (
          <Typography className="" style={{ color: props.color }}>
            {props.value}
          </Typography>
        ) : (
          <Typography className="">{props.value}</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default ValueLine;
