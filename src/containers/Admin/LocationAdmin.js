import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoleLocation from '../../components/HoleLocation/HoleLocation';
import { Typography, Grid } from '@material-ui/core';

class LocationAdmin extends Component {
  state = {};
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="title"
              component="h2"
              style={{ margin: '1em' }}
            >
              Location Admin
            </Typography>
          </Grid>
          {this.props.holesArray &&
            this.props.holesArray.map(hole => (
              <HoleLocation
                key={hole.number}
                holeNumber={hole.number}
                length={hole.yards}
                difficulty={hole.difficulty}
                par={hole.par}
                latitude={hole.latitude}
                longitude={hole.longitude}
              />
            ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    holesArray: state.scores.currentScorecard.holesArray
  };
};

export default connect(mapStateToProps)(LocationAdmin);
