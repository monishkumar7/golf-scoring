import axios from "axios";

import * as actionTypes from "./actionTypes";

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
    axios
      .post("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        dispatch(submitSuccess());
      })
      .catch(error => {
        dispatch(submitFail());
      });
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
