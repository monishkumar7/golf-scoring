import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import HoleLocation from '../../components/HoleLocation/HoleLocation';
import * as actionCreators from '../../store/actions';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

class LocationAdmin extends Component {
  componentDidMount = () => {
    if (this.props.holesArray.length === 0) this.props.onFetchHoleDetails();
  };

  handleUpdateLocal = holeNumber => {
    this.props.onUpdateLocal({
      holeNumber: holeNumber,
      isUpdating: false,
      isUpdateLoading: true
    });
    navigator.geolocation.getCurrentPosition(
      data => {
        let locationAccuracy = (data.coords.accuracy * 1.09361).toFixed(2);
        this.props.onUpdateLocal({
          holeNumber: holeNumber,
          lat: data.coords.latitude.toFixed(6),
          long: data.coords.longitude.toFixed(6),
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
    this.props.onUpdateLocal({
      holeNumber: holeNumber,
      isUpdateLoading: false,
      isUpdating: false
    });
  };

  handleConfirmUpdate = holeDetails => {
    this.props.onUpdateHole(holeDetails);
  };

  render() {
    return (
      <div>
        <Grid container>
          {this.props.loading ? (
            <LoadingSpinner />
          ) : (
            <Fragment>
              <Grid item xs={12}>
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    padding: '1em',
                    position: 'relative',
                    top: '.5em'
                  }}
                >
                  <Button variant="outlined">
                    <Typography variant="button">Go Back</Typography>
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="title"
                  component="h2"
                  style={{ margin: '1em' }}
                >
                  Location Admin
                </Typography>
              </Grid>
              {this.props.holesArray
                ? this.props.holesArray.map(hole => (
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
                  ))
                : ''}
            </Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    holesArray: state.scores.currentScorecard.holesArray,
    loading: state.scores.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLocal: holeDetails =>
      dispatch(actionCreators.updateHoleDetailLocal(holeDetails)),
    onUpdateHole: holeDetails =>
      dispatch(actionCreators.updateHoleDetail(holeDetails)),
    onFetchHoleDetails: () => dispatch(actionCreators.fetchHoleDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationAdmin);
