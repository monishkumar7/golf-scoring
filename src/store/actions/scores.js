import axios from "../../axios-allcal-staging-dashboard";

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
    axios
      .put("event/" + eventId + "/score", data, {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(inputChange(holeScore, holeNumber));
      })
      .catch(error => {});
  };
};

export const incrementScore = (holeNumber, holeScore) => {
  const loginToken = localStorage.getItem("loginToken");
  const eventId = localStorage.getItem("eventId");
  return dispatch => {
    const data = {
      holeNumber: holeNumber,
      score: +holeScore + +1
    };
    axios
      .put("event/" + eventId + "/score", data, {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(inputChange(+holeScore + +1, holeNumber));
      })
      .catch(error => {});
  };
};

export const decrementScore = (holeNumber, holeScore) => {
  const loginToken = localStorage.getItem("loginToken");
  const eventId = localStorage.getItem("eventId");
  return dispatch => {
    const data = {
      holeNumber: holeNumber,
      score: holeScore - 1
    };
    axios
      .put("event/" + eventId + "/score", data, {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(inputChange(holeScore - 1, holeNumber));
      })
      .catch(error => {});
  };
};

export const inputChange = (score, id) => {
  return {
    type: actionTypes.INPUT_CHANGE,
    newScore: score,
    holeId: id
  };
};

export const resetScoreUpdate = () => {
  const loginToken = localStorage.getItem("loginToken");
  const eventId = localStorage.getItem("eventId");
  //FIXME:
  //Don't do reset like this.
  //Use a proper API
  return dispatch => {
    let c = 0;
    for (let i = 1; i <= 18; i++) {
      const data = {
        holeNumber: i,
        score: ""
      };
      axios
        .put("event/" + eventId + "/score", data, {
          headers: {
            "login-token": loginToken
          }
        })
        .then(response => {
          dispatch(resetScore());
          c++;
          c === 17
            ? dispatch(fetchScores(eventId, loginToken))
            : console.log(null);
        })
        .catch(error => {});
    }
  };
};

export const resetScore = () => {
  return {
    type: actionTypes.RESET_SCORE
  };
};

export const submitScore = () => {
  return dispatch => {};
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
