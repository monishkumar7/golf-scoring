import React from 'react';
import { Card, Typography, CardContent, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  cardTitle: {
    textTransform: 'uppercase'
  },
  card: {
    margin: '1em',
    width: '15em'
  }
});

const holeLocation = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body1" className={classes.cardTitle}>
          Hole #4
        </Typography>
        <Typography variant="body1">Lat - 43.4424234</Typography>
        <Typography variant="body1">Long - -23.4424234</Typography>
        <Typography variant="body1">
          Current Location - LAT - 43.455 | LONG - -22.444
        </Typography>
        <Button variant="contained" color="primary">
          Get Location
        </Button>
        <Button variant="contained" color="secondary">
          Update Location
        </Button>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(holeLocation);
