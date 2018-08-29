import axios from "../../axios-allcal-staging-dashboard";

import * as actionTypes from "./actionTypes";

const eventId = localStorage.getItem("eventId");
const loginToken = localStorage.getItem("loginToken");

export const createScorecardStart = () => {
  return {
    type: actionTypes.CREATE_SCORECARD_START
  };
};

export const createScorecard = () => {
  return dispatch => {
    dispatch(createScorecardStart());
    axios
      .post("/scoreCard", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(createScorecardSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(createScorecardFail());
      });
  };
};

export const createScorecardSuccess = holeScores => {
  return {
    type: actionTypes.CREATE_SCORECARD_SUCCESS,
    holeScores: holeScores
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
      .get("/scoreCards", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(fetchAllScorecardsSuccess(response.data.data));
        response.data.data.forEach(scorecard => {
          dispatch(fetchScorecard(scorecard._id, scorecard.isComplete));
        });
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

export const fetchScorecardStart = () => {
  return {
    type: actionTypes.FETCH_SCORECARDS_START
  };
};

export const fetchScorecard = (scorecardId, isComplete) => {
  return dispatch => {
    dispatch(fetchScorecardStart());
    axios
      .get("/scoreCard/" + scorecardId + "/score", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(fetchScorecardSuccess(response.data.data, isComplete));
      })
      .catch(error => {
        dispatch(fetchScorecardFail());
      });
  };
};

export const fetchScorecardSuccess = (holeScores, isComplete) => {
  return {
    type: actionTypes.FETCH_SCORECARDS_SUCCESS,
    holeScores: holeScores,
    isComplete: isComplete
  };
};

export const fetchScorecardFail = () => {
  return {
    type: actionTypes.FETCH_SCORECARDS_FAIL
  };
};

export const updateScoreStart = () => {
  return {
    type: actionTypes.UPDATE_SCORE_START
  };
};

export const updateScore = (holeNumber, holeScore, touched) => {
  return dispatch => {
    dispatch(updateScoreStart());
    const data = {
      holeNumber: holeNumber,
      score: holeScore
    };
    axios
      .put("scoreCard/" + eventId + "/score", data, {
        headers: {
          "login-token": loginToken
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

export const incrementScore = (holeNumber, holeScore) => {
  const updatedScore = +holeScore + +1;
  return dispatch => {
    dispatch(updateScore(holeNumber, updatedScore, true));
  };
};

export const decrementScore = (holeNumber, holeScore) => {
  const updatedScore = holeScore - 1;
  return dispatch => {
    if (updatedScore <= 0) {
      dispatch(updateScore(holeNumber, updatedScore, false));
    } else {
      dispatch(updateScore(holeNumber, updatedScore, true));
    }
  };
};

export const resetScoreStart = () => {
  return {
    type: actionTypes.RESET_SCORE_START
  };
};

export const resetScore = () => {
  return dispatch => {
    dispatch(resetScoreStart());
    axios
      .delete("scoreCard/" + eventId + "/score/refresh", {
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
