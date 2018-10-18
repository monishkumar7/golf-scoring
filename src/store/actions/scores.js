import axios from '../../axios-allcal-staging-dashboard';

import * as actionTypes from './actionTypes';

const loginToken = localStorage.getItem('loginToken');

export const createScorecardStart = () => {
  return {
    type: actionTypes.CREATE_SCORECARD_START
  };
};

export const createScorecard = loginToken => {
  return dispatch => {
    dispatch(createScorecardStart());
    axios
      .post(
        '/scoreCard',
        {},
        {
          headers: {
            'login-token': loginToken
          }
        }
      )
      .then(response => {
        dispatch(createScorecardSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(createScorecardFail());
      });
  };
};

export const createScorecardSuccess = newScorecard => {
  return {
    type: actionTypes.CREATE_SCORECARD_SUCCESS,
    scorecardId: newScorecard._id
  };
};

export const createScorecardFail = () => {
  return {
    type: actionTypes.CREATE_SCORECARD_FAIL
  };
};

export const fetchAllScorecardsStart = () => {
  return {
    type: actionTypes.FETCH_ALL_SCORECARDS_START
  };
};

export const fetchAllScorecards = loginToken => {
  return dispatch => {
    dispatch(fetchAllScorecardsStart());
    axios
      .get('/scoreCards', {
        headers: {
          'login-token': loginToken
        }
      })
      .then(response => {
        dispatch(fetchAllScorecardsSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(fetchAllScorecardsFail());
      });
  };
};

export const fetchAllScorecardsSuccess = scoreCards => {
  return {
    type: actionTypes.FETCH_ALL_SCORECARDS_SUCCESS,
    scoreCards: scoreCards
  };
};

export const fetchAllScorecardsFail = () => {
  return {
    type: actionTypes.FETCH_ALL_SCORECARDS_FAIL
  };
};

export const fetchCurrentScorecardStart = () => {
  return {
    type: actionTypes.FETCH_CURRENT_SCORECARD_START
  };
};

export const fetchCurrentScorecard = scorecardId => {
  return dispatch => {
    dispatch(fetchCurrentScorecardStart());
    axios
      .get('/scoreCard/' + scorecardId + '/score', {
        headers: {
          'login-token': loginToken
        }
      })
      .then(response => {
        dispatch(fetchCurrentScorecardSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(fetchCurrentScorecardFail());
      });
  };
};

export const fetchCurrentScorecardSuccess = holeScores => {
  return {
    type: actionTypes.FETCH_CURRENT_SCORECARD_SUCCESS,
    holeScores: holeScores
  };
};

export const fetchCurrentScorecardFail = () => {
  return {
    type: actionTypes.FETCH_CURRENT_SCORECARD_FAIL
  };
};

export const fetchPreviousScorecardStart = scorecardId => {
  return {
    type: actionTypes.FETCH_PREVIOUS_SCORECARD_START,
    scorecardId: scorecardId
  };
};

export const fetchPreviousScorecard = scorecardId => {
  return dispatch => {
    dispatch(fetchPreviousScorecardStart(scorecardId));
    axios
      .get('/scoreCard/' + scorecardId + '/score', {
        headers: {
          'login-token': loginToken
        }
      })
      .then(response => {
        dispatch(fetchPreviousScorecardSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(fetchPreviousScorecardFail(scorecardId));
      });
  };
};

export const fetchPreviousScorecardSuccess = holeScores => {
  return {
    type: actionTypes.FETCH_PREVIOUS_SCORECARD_SUCCESS,
    holeScores: holeScores
  };
};

export const fetchPreviousScorecardFail = scorecardId => {
  return {
    type: actionTypes.FETCH_PREVIOUS_SCORECARD_FAIL,
    scorecardId: scorecardId
  };
};

export const updateScoreStart = () => {
  return {
    type: actionTypes.UPDATE_SCORE_START
  };
};

export const updateScore = (scorecardId, holeNumber, holeScore, touched) => {
  return dispatch => {
    dispatch(updateScoreStart());
    const data = {
      holeNumber: holeNumber,
      score: holeScore
    };
    axios
      .put('scoreCard/' + scorecardId + '/score', data, {
        headers: {
          'login-token': loginToken
        }
      })
      .then(response => {
        dispatch(updateScoreSuccess(holeNumber, holeScore, touched));
      })
      .catch(error => {
        dispatch(updateScoreFail());
      });
  };
};

export const updateScoreSuccess = (holeNumber, holeScore, touched) => {
  return {
    type: actionTypes.UPDATE_SCORE_SUCCESS,
    holeNumber: holeNumber,
    holeScore: holeScore,
    touched: touched
  };
};

export const updateScoreFail = () => {
  return {
    type: actionTypes.UPDATE_SCORE_FAIL
  };
};

export const incrementScore = (scorecardId, holeNumber, holeScore) => {
  const updatedScore = +holeScore + +1;
  return dispatch => {
    dispatch(updateScore(scorecardId, holeNumber, updatedScore, true));
  };
};

export const decrementScore = (scorecardId, holeNumber, holeScore) => {
  const updatedScore = holeScore - 1;
  return dispatch => {
    if (updatedScore <= 0) {
      dispatch(updateScore(scorecardId, holeNumber, updatedScore, false));
    } else {
      dispatch(updateScore(scorecardId, holeNumber, updatedScore, true));
    }
  };
};

export const resetScorecardStart = () => {
  return {
    type: actionTypes.RESET_SCORECARD_START
  };
};

export const resetScorecard = scorecardId => {
  return dispatch => {
    dispatch(resetScorecardStart());
    axios
      .delete('scoreCard/' + scorecardId + '/score/refresh', {
        headers: {
          'login-token': loginToken
        }
      })
      .then(response => {
        dispatch(resetScorecardSuccess());
      })
      .catch(error => {
        dispatch(resetScorecardFail());
      });
  };
};

export const resetScorecardSuccess = () => {
  return {
    type: actionTypes.RESET_SCORECARD_SUCCESS
  };
};

export const resetScorecardFail = () => {
  return {
    type: actionTypes.RESET_SCORECARD_FAIL
  };
};

export const submitScorecardStart = () => {
  return {
    type: actionTypes.SUBMIT_SCORECARD_START
  };
};

export const submitScorecard = scorecardId => {
  return dispatch => {
    dispatch(submitScorecardStart());
    const data = {
      isComplete: true
    };
    axios
      .put('scoreCards/' + scorecardId, data, {
        headers: {
          'login-token': loginToken
        }
      })
      .then(response => {
        dispatch(submitScorecardSuccess());
      })
      .catch(error => {
        dispatch(submitScorecardFail());
      });
  };
};

export const submitScorecardSuccess = () => {
  return {
    type: actionTypes.SUBMIT_SCORECARD_SUCCESS
  };
};

export const submitScorecardFail = () => {
  return {
    type: actionTypes.SUBMIT_SCORECARD_FAIL
  };
};

export const updateDistance = (holeNumber, holeDistance, locationAccuracy) => {
  return {
    type: actionTypes.UPDATE_DISTANCE,
    holeNumber: holeNumber,
    holeDistance: holeDistance,
    locationAccuracy: locationAccuracy
  };
};

export const startLocationFetching = holeNumber => {
  return {
    type: actionTypes.START_LOCATION_FETCHING,
    holeNumber: holeNumber
  };
};
