import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = (username, password) => {
  return dispatch => {
    axios
      .get("https://reqres.in/api/" + username + "/" + password)
      .then(response => {
        dispatch(
          authSuccess(
            response.data.data.first_name + " " + response.data.data.last_name
          )
        );
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const authSuccess = userId => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};
