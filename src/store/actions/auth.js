import axiosApi from "../../axios-allcal-api";

import * as actionTypes from "./actionTypes";

export const authStart = loginToken => {
  return dispatch => {
    axiosApi
      .get("/account", {
        headers: {
          "login-token": loginToken
        }
      })
      .then(response => {
        dispatch(authSuccess(response.data.userId, response.data.name));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const authSuccess = (userId, userName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    userName: userName
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};
