import axios from "../../axios-allcal-staging-api";

import * as actionTypes from "./actionTypes";

export const login = (email, password) => {
  return dispatch => {
    const data = {
      email: email,
      password: password
    };
    axios
      .post("/auth/login", data)
      .then(response => {
        console.log(response);
        dispatch(authStart(response.data.loginToken));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const authStart = loginToken => {
  return dispatch => {
    axios
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
