import React, { Fragment } from 'react';
import { Card, Typography, CardContent, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ValueLine from './ValueLine';
import Divider from '../UI/Divider/Divider';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const styles = () => ({
  cardTitle: {
    textTransform: 'uppercase'
  },
  card: {
    margin: '1em 2em'
  }
});

const holeLocation = props => {
  const { classes } = props;
  const latAction = props.isUpdating ? (
    <Fragment>
      <ValueLine title="New Lat" value={props.newLat} />
      <ValueLine title="New Long" value={props.newLong} />
      <Grid container justify="space-between">
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.cancelUpdate}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.confirmUpdate}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  ) : (
    <Fragment>
      <ValueLine title="Lat" value={props.latitude} />
      <ValueLine title="Long" value={props.longitude} />
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={props.updateLocal}
      >
        Set Hole Location
      </Button>
    </Fragment>
  );

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography
                component="h3"
                variant="subheading"
                className={classes.cardTitle}
              >
                Hole
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="title">
                {props.holeNumber}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <ValueLine title="Length" value={props.length} />
          <ValueLine title="Difficulty" value={props.difficulty} />
          <ValueLine title="Par" value={props.par} />
          {props.isUpdateLoading ? <LoadingSpinner /> : latAction}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default withStyles(styles)(holeLocation);
