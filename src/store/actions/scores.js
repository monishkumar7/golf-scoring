import axios from "../../axios-allcal-staging-dashboard";

import * as actionTypes from "./actionTypes";

const eventId = localStorage.getItem("eventId");
const loginToken = localStorage.getItem("loginToken");

export const updateEventId = eventId => {
  return {
    type: actionTypes.UPDATE_EVENTID,
    eventId: eventId
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

export const apiScoreUpdate = (holeNumber, holeScore, touched) => {
  return dispatch => {
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
        dispatch(scoreUpdate(holeNumber, holeScore, touched));
      })
      .catch(error => {});
  };
};

export const scoreUpdate = (holeNumber, holeScore, touched) => {
  return {
    type: actionTypes.SCORE_UPDATE,
    holeNumber: holeNumber,
    holeScore: holeScore,
    touched: touched
  };
};

export const apiResetScore = () => {
  return dispatch => {
    axios
      .delete("event/" + eventId + "/score/refresh", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(resetScore());
      })
      .catch(error => {});
  };
};

export const resetScore = () => {
  return {
    type: actionTypes.RESET_SCORE
  };
};

export const fetchScores = () => {
  return dispatch => {
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
