import axios from "../../axios-allcal-staging-dashboard";

import * as actionTypes from "./actionTypes";

const eventId = localStorage.getItem("eventId");
const loginToken = localStorage.getItem("loginToken");

export const scoreUpdateStart = () => {
  return {
    type: actionTypes.SCORE_UPDATE_START
  };
};

export const apiScoreUpdate = (holeNumber, holeScore, touched) => {
  return dispatch => {
    dispatch(scoreUpdateStart());
    const data = {
      holeNumber: holeNumber,
      score: holeScore
    };
    axios
      .put("event/" + eventId + "/score", data, {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(scoreUpdateSuccess(holeNumber, holeScore, touched));
      })
      .catch(error => {
        dispatch(scoreUpdateFail());
      });
  };
};

export const scoreUpdateSuccess = (holeNumber, holeScore, touched) => {
  return {
    type: actionTypes.SCORE_UPDATE_SUCCESS,
    holeNumber: holeNumber,
    holeScore: holeScore,
    touched: touched
  };
};

export const scoreUpdateFail = () => {
  return {
    type: actionTypes.SCORE_UPDATE_FAIL
  };
};

export const incrementScore = (holeNumber, holeScore) => {
  const updatedScore = +holeScore + +1;
  return dispatch => {
    dispatch(apiScoreUpdate(holeNumber, updatedScore, true));
  };
};

export const decrementScore = (holeNumber, holeScore) => {
  const updatedScore = holeScore - 1;
  return dispatch => {
    if (updatedScore <= 0) {
      dispatch(apiScoreUpdate(holeNumber, updatedScore, false));
    } else {
      dispatch(apiScoreUpdate(holeNumber, updatedScore, true));
    }
  };
};

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_START
  };
};

export const apiFetchScores = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("/event/" + eventId + "/score", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(fetchSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(fetchFail());
      });
  };
};

export const fetchSuccess = holeScores => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    holeScores: holeScores
  };
};

export const fetchFail = () => {
  return {
    type: actionTypes.FETCH_FAIL
  };
};

export const resetScoreStart = () => {
  return {
    type: actionTypes.RESET_SCORE_START
  };
};

export const apiResetScore = () => {
  return dispatch => {
    dispatch(resetScoreStart());
    axios
      .delete("event/" + eventId + "/score/refresh", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(resetScoreSuccess());
      })
      .catch(error => {
        dispatch(resetScoreFail());
      });
  };
};

export const resetScoreSuccess = () => {
  return {
    type: actionTypes.RESET_SCORE_SUCCESS
  };
};

export const resetScoreFail = () => {
  return {
    type: actionTypes.RESET_SCORE_FAIL
  };
};

export const updateEventId = eventId => {
  return {
    type: actionTypes.UPDATE_EVENTID,
    eventId: eventId
  };
};
