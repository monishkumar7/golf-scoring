import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import HoleLocation from '../../components/HoleLocation/HoleLocation';
import * as actionCreators from '../../store/actions';

class LocationAdmin extends Component {
  state = {};

  handleUpdateLocal = holeNumber => {
    this.props.onUpdateLocal({ holeNumber: holeNumber, isUpdateLoading: true });
    navigator.geolocation.getCurrentPosition(
      data => {
        let locationAccuracy = (data.coords.accuracy * 1.09361).toFixed(2);
        this.props.onUpdateLocal({
          holeNumber: holeNumber,
          lat: data.coords.latitude,
          long: data.coords.longitude,
          accuracy: locationAccuracy,
          isUpdateLoading: false,
          isUpdating: true
        });
      },
      err => {
        console.log('Error ', err);
      },
      { enableHighAccuracy: true }
    );
  };

  handleCancelUpdate = holeNumber => {
    this.props.onUpdateLocal({ holeNumber: holeNumber, isUpdating: false });
  };

  handleConfirmUpdate = holeDetails => {
    this.props.onUpdateHole(holeDetails);
  };

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
                updateLocal={() => this.handleUpdateLocal(hole.number)}
                newLat={hole.newLat}
                newLong={hole.newLong}
                newAccuracy={hole.newAccuracy}
                isUpdating={hole.isUpdating}
                isUpdateLoading={hole.isUpdateLoading}
                cancelUpdate={() => this.handleCancelUpdate(hole.number)}
                confirmUpdate={() =>
                  this.handleConfirmUpdate({
                    holeNumber: hole.number,
                    latitude: hole.newLat,
                    longitude: hole.newLong,
                    yards: hole.yards,
                    par: hole.par,
                    difficulty: hole.difficulty
                  })
                }
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLocal: holeDetails =>
      dispatch(actionCreators.updateHoleDetailLocal(holeDetails)),
    onUpdateHole: holeDetails =>
      dispatch(actionCreators.updateHoleDetail(holeDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationAdmin);
