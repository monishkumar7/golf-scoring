import axios from "../../axios-allcal";

import * as actionTypes from "./actionTypes";

export const authStart = (loginToken, appMode) => {
  return dispatch => {
    axios
      .get("/account", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.name, appMode));
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
