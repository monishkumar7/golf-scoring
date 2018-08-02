import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = (username, password, appMode) => {
  return dispatch => {
    axios
      .get("https://reqres.in/api/" + username + "/" + password)
      .then(response => {
        dispatch(
          authSuccess(
            response.data.data.first_name + " " + response.data.data.last_name,
            appMode
          )
        );
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const authSuccess = (userId, appMode) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    appMode: appMode
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};
