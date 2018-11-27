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
  let accuracyContent = '';
  if (props.newAccuracy <= 30) {
    accuracyContent = (
      <ValueLine
        title="Location Accuracy"
        value={props.newAccuracy + ' yards'}
        color="green"
      />
    );
  } else if (props.newAccuracy > 30 && props.newAccuracy <= 100) {
    accuracyContent = (
      <ValueLine
        title="Location Accuracy"
        value={props.newAccuracy + ' yards'}
        color="#ff9d00"
      />
    );
  } else {
    accuracyContent = (
      <ValueLine
        title="Location Accuracy"
        value={props.newAccuracy + ' yards'}
        color="red"
      />
    );
  }
  const latAction = props.isUpdating ? (
    <Fragment>
      <ValueLine
        title="New Latitude"
        strikethrough
        oldTitle="Old Latitude"
        oldValue={props.latitude}
        value={props.newLat}
      />
      <ValueLine
        title="New Longitude"
        strikethrough
        oldTitle="Old Longitude"
        oldValue={props.longitude}
        value={props.newLong}
      />
      {accuracyContent}
      <Grid container justify="space-between">
        {props.newAccuracy > 30 ? (
          <Grid item xs={12} style={{ textAlign: 'center', margin: '0 0 1em' }}>
            <Button variant="outlined" onClick={props.updateLocal}>
              Get Location Again
            </Button>
          </Grid>
        ) : (
          ''
        )}
        <Grid item>
          <Button variant="outlined" onClick={props.cancelUpdate}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={props.confirmUpdate}
          >
            Confirm Update
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  ) : (
    <Fragment>
      <ValueLine title="Latitude" value={props.latitude} />
      <ValueLine title="Longitude" value={props.longitude} />
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
                component="h2"
                variant="h2"
                className={classes.cardTitle}
              >
                Hole
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h1">
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
