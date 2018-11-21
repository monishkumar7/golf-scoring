import React, { Component, Fragment } from 'react';
import { Card, Typography, CardContent, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ValueLine from './ValueLine';
import Divider from '../UI/Divider/Divider';

const styles = () => ({
  cardTitle: {
    textTransform: 'uppercase'
  },
  card: {
    margin: '1em 2em'
  }
});

class HoleLocation extends Component {
  state = {
    updated: false,
    text: 'SAMPLE',
    lat: '',
    long: ''
  };

  handleSetLocation = () => {
    console.log('hey');
    navigator.geolocation.getCurrentPosition(
      data => {
        console.log('Inside');
        let locationAccuracy = (data.coords.accuracy * 1.09361).toFixed(2);
        console.log('Lat', data.coords.latitude);
        console.log('Long', data.coords.longitude);
        console.log('Accuracy', locationAccuracy, 'yards');
        this.setState(prevState => ({
          lat: data.coords.latitude,
          long: data.coords.longitude,
          text: 'Success'
        }));
        console.log(this.state);
      },
      () => {
        console.log('Error');
      },
      { enableHighAccuracy: true }
    );
  };

  render() {
    const { classes } = this.props;
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
                  {this.props.holeNumber}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <ValueLine title="Length" value={this.props.length} />
            <ValueLine title="Difficulty" value={this.props.difficulty} />
            <ValueLine title="Par" value={this.props.par} />
            {!this.state.updated ? (
              <Fragment>
                <ValueLine title="Lat" value={this.props.latitude} />
                <ValueLine title="Long" value={this.props.longitude} />
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={this.handleSetLocation}
                >
                  Set Hole Location
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <ValueLine title="New Lat" value="43.442241" />
                <ValueLine title="New Long" value="42.524522" />
                <Grid container justify="space-between">
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleSetLocation}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleSetLocation}
                    >
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(HoleLocation);
