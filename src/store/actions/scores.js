import axios from "../../axios-allcal-staging-dashboard";

import * as actionTypes from "./actionTypes";

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
      .post(
        "/scoreCard",
        {},
        {
          headers: {
            "login-token": loginToken
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
      .get("/scoreCards", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(fetchAllScorecardsSuccess(response.data.data));
        for (let scorecard of response.data.data) {
          dispatch(fetchScorecard(scorecard._id, scorecard.isComplete));
        }
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
    type: actionTypes.FETCH_SCORECARD_START
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
    type: actionTypes.FETCH_SCORECARD_SUCCESS,
    holeScores: holeScores,
    isComplete: isComplete
  };
};

export const fetchScorecardFail = () => {
  return {
    type: actionTypes.FETCH_SCORECARD_FAIL
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
      .put("scoreCard/" + scorecardId + "/score", data, {
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
      .delete("scoreCard/" + scorecardId + "/score/refresh", {
        headers: {
          "login-token": loginToken
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
      .put("scoreCards/" + scorecardId, data, {
        headers: {
          "login-token": loginToken
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
