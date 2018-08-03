import axiosStaging from "../../axios-allcal-staging";

import * as actionTypes from "./actionTypes";

export const updateEventId = eventId => {
  return {
    type: actionTypes.UPDATE_EVENTID,
    eventId: eventId
  };
};

export const inputChangeUpdate = (holeNumber, holeScore) => {
  const loginToken = localStorage.getItem("loginToken");
  const eventId = localStorage.getItem("eventId");
  return dispatch => {
    const data = {
      holeNumber: holeNumber,
      score: holeScore
    };
    axiosStaging
      .put("event/" + eventId + "/score", data, {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        console.log(response);
        dispatch(inputChange(holeScore, holeNumber));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const inputChange = (score, id) => {
  return {
    type: actionTypes.INPUT_CHANGE,
    newScore: score,
    holeId: id
  };
};

export const resetScore = () => {
  return {
    type: actionTypes.RESET_SCORE
  };
};

export const submitScore = () => {
  return dispatch => {
    console.log("submitScore");
  };
};

export const submitSuccess = () => {
  return {
    type: actionTypes.SUBMIT_SUCCESS
  };
};

export const submitFail = () => {
  return {
    type: actionTypes.SUBMIT_FAIL
  };
};

export const fetchScores = (eventId, loginToken) => {
  return dispatch => {
    axiosStaging
      .get("/event/" + eventId + "/score", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        console.log(response);
        dispatch(fetchSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchFail());
      });
  };
};

export const fetchSuccess = () => {
  return {
    type: actionTypes.FETCH_SUCCESS
  };
};

export const fetchFail = () => {
  return {
    type: actionTypes.FETCH_FAIL
  };
};
