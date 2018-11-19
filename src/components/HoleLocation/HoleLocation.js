import React, { Component, Fragment } from 'react';
import { Card, Typography, CardContent, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ValueLine from './ValueLine';
import Divider from '../UI/Divider/Divider';

const styles = () => ({
  cardTitle: {
    textTransform: 'uppercase',
    margin: '0 0 1em'
  },
  card: {
    margin: '1em',
    width: '20em'
  }
});

class HoleLocation extends Component {
  state = {
    updated: false,
    text: 'TRUE'
  };

  handleSetLocation = () => {
    this.setState(prevState => ({ updated: !prevState.updated }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography component="h3" variant="h3" className={classes.cardTitle}>
            Hole #4
          </Typography>
          <Divider />
          <ValueLine title="Par" value="4" />
          <ValueLine title="Difficulty" value="17" />
          <ValueLine title="Length" value="460 yards" />
          {!this.state.updated ? (
            <Fragment>
              <ValueLine title="Lat" value="43.442241" />
              <ValueLine title="Long" value="42.524522" />
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
    );
  }
}

export default withStyles(styles)(HoleLocation);
